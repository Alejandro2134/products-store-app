import { ApiProperty } from '@nestjs/swagger';

export interface ICustomerDTO {
  id?: number;
  email: string;
  full_name: string;
  address: CustomerAddress;
}

export interface ICustomerFilter {
  email?: string;
}

class CustomerAddress {
  @ApiProperty({ example: 'Cra 123' })
  address_line_1: string;

  @ApiProperty({ example: 'CO' })
  country: string;

  @ApiProperty({ example: 'Bogota' })
  city: string;

  @ApiProperty({ example: '573143648188' })
  phone_number: string;

  @ApiProperty({ example: 'Cundinamarca' })
  region: string;
}

export class CustomerDTO {
  id?: number;

  @ApiProperty({ example: 'john@example.com' })
  email: string;

  @ApiProperty({ example: 'John Doe' })
  full_name: string;

  @ApiProperty({
    type: () => CustomerAddress,
  })
  address: CustomerAddress;

  constructor(item: ICustomerDTO) {
    this.id = item.id;
    this.email = item.email;
    this.full_name = item.full_name;
    this.address = {
      address_line_1: item.address.address_line_1,
      city: item.address.city,
      country: item.address.country,
      phone_number: item.address.phone_number,
      region: item.address.region,
    };
  }
}
