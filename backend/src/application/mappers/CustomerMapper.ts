import { CustomerDTO } from '@application/dto/Customer';
import { Customer } from '@domain/entities/Customer';
import { MapperDomain, MapperDTO } from './Mapper';

export class CustomerMapper
  implements
    MapperDTO<Customer, CustomerDTO>,
    MapperDomain<Customer, CustomerDTO>
{
  fromDomainToDTO(this: void, domain: Customer): CustomerDTO {
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

  fromDTOToDomain(this: void, dto: CustomerDTO): Customer {
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
