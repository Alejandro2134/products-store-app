import { Customer } from '@domain/entities/Customer';
import { Payment } from '@domain/entities/Payment';

export interface CreatePaymentPort {
  execute(
    customer: Customer,
    paymentMethodToken: string,
    amount: number,
  ): Promise<Payment>;
}
