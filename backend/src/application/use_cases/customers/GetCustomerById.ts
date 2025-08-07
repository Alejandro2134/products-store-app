import { CustomerDTO } from '@application/dto/Customer';
import { NotFoundError } from '@application/errors/NotFundError';
import { CustomerMapper } from '@application/mappers/CustomerMapper';
import { GetCustomerByIdPort } from '@application/ports/in/CustomerPorts';
import { CustomerPort } from '@domain/ports/out/CustomerPort';

export class GetCustomerById implements GetCustomerByIdPort {
  private customerMapper = new CustomerMapper();

  constructor(private readonly customerAdapter: CustomerPort) {}

  async execute(id: number, t?: unknown): Promise<CustomerDTO> {
    const customer = await this.customerAdapter.findById(id, t);
    if (!customer) throw new NotFoundError(`Customer with id ${id} not found`);

    return this.customerMapper.fromDomainToDTO(customer);
  }
}
