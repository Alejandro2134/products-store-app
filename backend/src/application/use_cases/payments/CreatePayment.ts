import { CreatePaymentPort } from '@application/ports/in/PaymentPorts';
import { Customer } from '@domain/entities/Customer';
import { Payment } from '@domain/entities/Payment';
import { PaymentGatewayPort } from '@domain/ports/out/PaymentGatewayPort';

export class CreatePayment implements CreatePaymentPort {
  constructor(private readonly paymentGatewayAdapter: PaymentGatewayPort) {}

  async execute(
    customer: Customer,
    paymentMethodToken: string,
    amount: number,
  ): Promise<Payment> {
    const payment = new Payment({
      amount,
      currency: 'COP',
      customerAddressLine1: customer.getAddress().addressLine1,
      customerCity: customer.getAddress().city,
      customerCountry: customer.getAddress().country,
      customerEmail: customer.getEmail(),
      customerFullName: customer.getFullName(),
      customerPhoneNumber: customer.getAddress().phoneNumber,
      customerRegion: customer.getAddress().region,
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
