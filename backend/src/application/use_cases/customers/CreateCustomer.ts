import { CustomerDTO } from '@application/dto/Customer';
import { AlreadyExistsError } from '@application/errors/AlreadyExistsError';
import { CustomerMapper } from '@application/mappers/CustomerMapper';
import { CreateCustomerPort } from '@application/ports/in/CustomerPorts';
import { CustomerPort } from '@domain/ports/out/CustomerPort';

export class CreateCustomer implements CreateCustomerPort {
  private customerMapper = new CustomerMapper();

  constructor(private readonly customerAdapter: CustomerPort) {}

  async execute(item: CustomerDTO): Promise<CustomerDTO> {
    const entity = this.customerMapper.fromDTOToDomain(item);

    const customer = await this.customerAdapter.findAll({
      email: entity.getEmail(),
    });

    if (customer.length > 0)
      throw new AlreadyExistsError(
        'A customer with the provided email already exists',
      );

    const createdCustomer = await this.customerAdapter.create(entity);
    return this.customerMapper.fromDomainToDTO(createdCustomer);
  }
}
