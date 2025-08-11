import { NotFoundError } from '@application/errors/NotFundError';
import { GetCustomerByIdPort } from '@application/ports/in/CustomerPorts';
import { Customer } from '@domain/entities/Customer';
import { CustomerPort } from '@domain/ports/out/CustomerPort';

export class GetCustomerById implements GetCustomerByIdPort {
  constructor(private readonly customerAdapter: CustomerPort) {}

  async execute(id: number, t?: unknown): Promise<Customer> {
    const customer = await this.customerAdapter.findById(id, t);
    if (!customer) throw new NotFoundError(`Customer with id ${id} not found`);

    return customer;
  }
}
