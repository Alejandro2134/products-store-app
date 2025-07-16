import { CustomerDTO } from '@application/dto/Customer';
import { Payment } from '@domain/entities/Payment';

export interface CreatePaymentPort {
  execute(
    customer: CustomerDTO,
    paymentMethodToken: string,
    amount: number,
  ): Promise<Payment>;
}
