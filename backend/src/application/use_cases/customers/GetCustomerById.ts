import { CustomerDTO } from '@application/dto/Customer';
import { NotFoundError } from '@application/errors/NotFundError';
import { MapperDomain } from '@application/mappers/Mapper';
import { GetCustomerByIdPort } from '@application/ports/in/CustomerPorts';
import { Customer } from '@domain/entities/Customer';
import { CustomerPort } from '@domain/ports/out/CustomerPort';

export class GetCustomerById
  implements MapperDomain<Customer, CustomerDTO>, GetCustomerByIdPort
{
  constructor(private readonly customerAdapter: CustomerPort) {}

  async execute(id: number, t?: unknown): Promise<CustomerDTO> {
    const customer = await this.customerAdapter.findById(id, t);
    if (!customer) throw new NotFoundError(`Customer with id ${id} not found`);

    return this.fromDomainToDTO(customer);
  }

  fromDomainToDTO(domain: Customer): CustomerDTO {
    return new CustomerDTO({
      address: {
        address_line_1: domain.getAddress().addressLine1,
        city: domain.getAddress().city,
        country: domain.getAddress().country,
        phone_number: domain.getAddress().phoneNumber,
        region: domain.getAddress().region,
      },
      email: domain.getEmail(),
      full_name: domain.getFullName(),
      id: domain.getId(),
    });
  }
}
