import { CustomerDTO } from '@application/dto/Customer';
import { AlreadyExistsError } from '@application/errors/AlreadyExistsError';
import { MapperDomain, MapperDTO } from '@application/mappers/Mapper';
import { CreateCustomerPort } from '@application/ports/in/CustomerPorts';
import { Customer } from '@domain/entities/Customer';
import { CustomerPort } from '@domain/ports/out/CustomerPort';

export class CreateCustomer
  implements
    CreateCustomerPort,
    MapperDTO<Customer, CustomerDTO>,
    MapperDomain<Customer, CustomerDTO>
{
  constructor(private readonly customerAdapter: CustomerPort) {}

  async execute(item: CustomerDTO): Promise<CustomerDTO> {
    const entity = this.fromDTOToDomain(item);

    const customer = await this.customerAdapter.findAll({
      email: entity.getEmail(),
    });

    if (customer.length > 0)
      throw new AlreadyExistsError(
        'A customer with the provided email already exists',
      );

    const createdCustomer = await this.customerAdapter.create(entity);
    return this.fromDomainToDTO(createdCustomer);
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

  fromDTOToDomain(dto: CustomerDTO): Customer {
    return new Customer({
      address: {
        addressLine1: dto.address.address_line_1,
        city: dto.address.city,
        country: dto.address.country,
        phoneNumber: dto.address.phone_number,
        region: dto.address.region,
      },
      email: dto.email,
      fullName: dto.full_name,
    });
  }
}
