import { Payment } from '@domain/entities/Payment';

export interface PaymentGatewayPort {
  startPayment(paymentInfo: Payment): Promise<Payment>;
}
