import { GetCustomersPort } from '@application/ports/in/CustomerPorts';
import { Customer, ICustomerFilter } from '@domain/entities/Customer';
import { CustomerPort } from '@domain/ports/out/CustomerPort';

export class GetCustomers implements GetCustomersPort {
  constructor(private readonly customerAdapter: CustomerPort) {}

  async execute(filter: ICustomerFilter): Promise<Customer[]> {
    const customers = await this.customerAdapter.findAll(filter);
    return customers;
  }
}
