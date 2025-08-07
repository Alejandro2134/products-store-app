import { PaymentGatewayPort } from '@domain/ports/out/PaymentGatewayPort';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import {
  AcceptanceTokenError,
  AcceptanceTokenResponse,
  PaymentRequest,
  PaymentResponse,
  PaymentResponseError,
} from '@infrastructure/integrations/payments/api/PaymentAPI';
import { Mapper } from '@infrastructure/integrations/payments/mappers/Mapper';
import { Payment } from '@domain/entities/Payment';
import { randomUUID } from 'crypto';
import { Injectable } from '@nestjs/common';
import { isAxiosError } from 'axios';
import { PaymentError } from '@application/errors/PaymentError';
import { SecurityUtilPorts } from '@application/ports/in/SecurityUtilPorts';
import { SecurityUtils } from '@infrastructure/utils/SecurityUtils';

@Injectable()
export class PaymentGatewayAdapter
  implements
    PaymentGatewayPort,
    Mapper<Payment, PaymentRequest, PaymentResponse>
{
  private readonly securityUtils: SecurityUtilPorts;

  constructor(private readonly httpService: HttpService) {
    this.securityUtils = new SecurityUtils();
  }

  async getAcceptanceToken(): Promise<string> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get<AcceptanceTokenResponse>(
          `${process.env.PAYMENT_BASE_URL}/v1/merchants/${process.env.PAYMENT_PUBLIC_API_KEY}`,
        ),
      );

      return data.data.presigned_acceptance.acceptance_token;
    } catch (error) {
      if (
        isAxiosError(error) &&
        (error.response?.data as AcceptanceTokenError)?.error
      ) {
        const paymentError = error.response?.data as AcceptanceTokenError;
        console.error(paymentError.error.reason);
      }

      throw new PaymentError();
    }
  }

  async startPayment(
    paymentInfo: Payment,
    acceptanceToken: string,
  ): Promise<Payment> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.post<PaymentResponse, PaymentRequest>(
          `${process.env.PAYMENT_BASE_URL}/v1/transactions`,
          this.fromDomainToAPITransactions(paymentInfo, acceptanceToken),
          {
            headers: {
              Authorization: `Bearer ${process.env.PAYMENT_PUBLIC_API_KEY}`,
            },
          },
        ),
      );

      return this.fromAPITransactionsToDomain(data);
    } catch (error) {
      if (
        isAxiosError(error) &&
        (error.response?.data as PaymentResponseError)?.error
      ) {
        const paymentError = error.response?.data as PaymentResponseError;
        console.error(paymentError.error.messages);
      }

      throw new PaymentError();
    }
  }

  fromDomainToAPITransactions(
    domain: Payment,
    acceptanceToken: string,
  ): PaymentRequest {
    const reference = randomUUID();

    return {
      acceptance_token: acceptanceToken,
      amount_in_cents: domain.getAmount(),
      currency: domain.getCurrency(),
      signature: this.securityUtils.generateHash([
        reference,
        domain.getAmount().toString(),
        domain.getCurrency(),
        process.env.PAYMENT_INTEGRITY_SECRET!,
      ]),
      customer_email: domain.getCustomerEmail(),
      customer_data: {
        full_name: domain.getCustomerFullName(),
      },
      payment_method: {
        type: domain.getMethod(),
        token: domain.getToken(),
        installments: 1,
      },
      reference,
      shipping_address: {
        address_line_1: domain.getCustomerAddressLine1(),
        country: domain.getCustomerCountry(),
        region: domain.getCustomerRegion(),
        city: domain.getCustomerCity(),
        phone_number: domain.getCustomerPhoneNumber(),
      },
    };
  }

  fromAPITransactionsToDomain(api: PaymentResponse): Payment {
    return new Payment({
      amount: api.data.amount_in_cents,
      currency: api.data.currency,
      customerFullName: '',
      customerEmail: api.data.customer_email,
      customerAddressLine1: api.data.shipping_address.address_line_1,
      customerCountry: api.data.shipping_address.country,
      customerRegion: api.data.shipping_address.region,
      customerCity: api.data.shipping_address.city,
      customerPhoneNumber: api.data.shipping_address.phone_number.toString(),
      method: api.data.payment_method.type,
      token: '',
      id: api.data.id,
      reference: api.data.reference,
    });
  }
}
