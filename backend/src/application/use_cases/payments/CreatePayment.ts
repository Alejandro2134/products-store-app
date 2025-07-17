import { CustomerDTO } from '@application/dto/Customer';
import { CreatePaymentPort } from '@application/ports/in/PaymentPorts';
import { Payment } from '@domain/entities/Payment';
import { PaymentGatewayPort } from '@domain/ports/out/PaymentGatewayPort';

export class CreatePayment implements CreatePaymentPort {
  constructor(private readonly paymentGatewayAdapter: PaymentGatewayPort) {}

  async execute(
    customer: CustomerDTO,
    paymentMethodToken: string,
    amount: number,
  ): Promise<Payment> {
    const payment = new Payment({
      amount,
      currency: 'COP',
      customerAddressLine1: customer.address.address_line_1,
      customerCity: customer.address.city,
      customerCountry: customer.address.country,
      customerEmail: customer.email,
      customerFullName: customer.full_name,
      customerPhoneNumber: customer.address.phone_number,
      customerRegion: customer.address.region,
      method: 'CARD',
      token: paymentMethodToken,
    });

    const acceptanceToken =
      await this.paymentGatewayAdapter.getAcceptanceToken();
    return await this.paymentGatewayAdapter.startPayment(
      payment,
      acceptanceToken,
    );
  }
}
