import { ICustomerFilter, CustomerDTO } from '@application/dto/Customer';
import { MapperDomain } from '@application/mappers/Mapper';
import { GetCustomersPort } from '@application/ports/in/CustomerPorts';
import { Customer } from '@domain/entities/Customer';
import { CustomerPort } from '@domain/ports/out/CustomerPort';

export class GetCustomers
  implements GetCustomersPort, MapperDomain<Customer, CustomerDTO>
{
  constructor(private readonly customerAdapter: CustomerPort) {}

  async execute(filter: ICustomerFilter): Promise<CustomerDTO[]> {
    const customers = await this.customerAdapter.findAll(filter);
    return customers.map(this.fromDomainToDTO);
  }

  fromDomainToDTO(this: void, domain: Customer): CustomerDTO {
    return new CustomerDTO({
      address: {
        address_line_1: domain.getAddress().addressLine1,
        city: domain.getAddress().city,
        country: domain.getAddress().country,
        phone_number: domain.getAddress().phoneNumber,
      },
      email: domain.getEmail(),
      full_name: domain.getFullName(),
      id: domain.getId(),
    });
  }
}
