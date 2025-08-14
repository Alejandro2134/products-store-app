import { Payment } from '@domain/entities/Payment';

export interface PaymentGatewayPort {
  startPayment(
    this: void,
    paymentInfo: Payment,
    acceptanceToken: string,
  ): Promise<Payment>;
  getAcceptanceToken(this: void): Promise<string>;
}
