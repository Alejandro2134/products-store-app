import { PaymentGatewayPort } from '@domain/ports/out/PaymentGatewayPort';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import {
  PaymentRequest,
  PaymentResponse,
} from '@infrastructure/integrations/payments/api/PaymentAPI';
import { Mapper } from '@infrastructure/integrations/payments/mappers/Mapper';
import { Payment } from '@domain/entities/Payment';
import { randomUUID, createHash } from 'crypto';

export class PaymentGatewayAdapter
  implements
    PaymentGatewayPort,
    Mapper<Payment, PaymentRequest, PaymentResponse>
{
  constructor(private readonly httpService: HttpService) {}

  async startPayment(paymentInfo: Payment): Promise<Payment> {
    const { data } = await firstValueFrom(
      this.httpService.post<PaymentResponse, PaymentRequest>(
        `${process.env.PAYMENT_BASE_URL}/v1/transactions`,
        this.fromDomainToAPITransactions(paymentInfo),
        {
          headers: {
            Authorization: `Bearer ${process.env.PAYMENT_PUBLIC_API_KEY}`,
          },
        },
      ),
    );

    return this.fromAPITransactionsToDomain(data);
  }

  fromDomainToAPITransactions(domain: Payment): PaymentRequest {
    const reference = randomUUID();

    return {
      acceptance_token: `${process.env.PAYMENT_ACCEPTANCE_TOKEN}`,
      amount_in_cents: domain.getAmount(),
      currency: domain.getCurrency(),
      signature: this.generateSignature(
        reference,
        domain.getAmount(),
        domain.getCurrency(),
      ),
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
    });
  }

  generateSignature(reference: string, amount: number, currency: string) {
    const data = `${reference}${amount}${currency}${process.env.PAYMENT_INTEGRITY_SECET}`;
    return createHash('sha256').update(data).digest('hex');
  }
}
