import { Payment } from '@domain/entities/Payment';

export interface PaymentGatewayPort {
  startPayment(paymentInfo: Payment, acceptanceToken: string): Promise<Payment>;
  getAcceptanceToken(): Promise<string>;
}
