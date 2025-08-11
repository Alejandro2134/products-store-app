import { AlreadyExistsError } from '@application/errors/AlreadyExistsError';
import { CreateCustomerPort } from '@application/ports/in/CustomerPorts';
import { Customer } from '@domain/entities/Customer';
import { CustomerPort } from '@domain/ports/out/CustomerPort';

export class CreateCustomer implements CreateCustomerPort {
  constructor(private readonly customerAdapter: CustomerPort) {}

  async execute(item: Customer): Promise<Customer> {
    const customer = await this.customerAdapter.findAll({
      email: item.getEmail(),
    });

    if (customer.length > 0)
      throw new AlreadyExistsError(
        'A customer with the provided email already exists',
      );

    const createdCustomer = await this.customerAdapter.create(item);
    return createdCustomer;
  }
}
