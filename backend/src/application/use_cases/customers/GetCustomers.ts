import { ICustomerFilter, CustomerDTO } from '@application/dto/Customer';
import { CustomerMapper } from '@application/mappers/CustomerMapper';
import { GetCustomersPort } from '@application/ports/in/CustomerPorts';
import { CustomerPort } from '@domain/ports/out/CustomerPort';

export class GetCustomers implements GetCustomersPort {
  private customerMapper = new CustomerMapper();

  constructor(private readonly customerAdapter: CustomerPort) {}

  async execute(filter: ICustomerFilter): Promise<CustomerDTO[]> {
    const customers = await this.customerAdapter.findAll(filter);
    return customers.map(this.customerMapper.fromDomainToDTO);
  }
}
