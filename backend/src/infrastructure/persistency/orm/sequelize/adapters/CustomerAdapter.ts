import { Customer, ICustomerFilter } from '@domain/entities/Customer';
import { CustomerPort } from '@domain/ports/out/CustomerPort';
import { MapperDomain, MapperModel } from '../mappers/Mapper';
import { Customer as CustomerModel } from '@infrastructure/persistency/orm/sequelize/models/Customer';
import { InjectModel } from '@nestjs/sequelize';
import { CreationAttributes } from 'sequelize';

export class CustomerAdapter
  implements
    CustomerPort,
    MapperModel<Customer, CustomerModel>,
    MapperDomain<Customer, CreationAttributes<CustomerModel>>
{
  constructor(
    @InjectModel(CustomerModel)
    private customerModel: typeof CustomerModel,
  ) {}

  async findAll(filter: ICustomerFilter): Promise<Customer[]> {
    const where: { [filter: string]: string } = {};

    if (filter.email) where['email'] = filter.email;

    const res = await this.customerModel.findAll({ where });
    return res.map(this.fromModelToDomain);
  }

  async create(item: Customer): Promise<Customer> {
    const customer = this.fromDomainToModel(item);
    const createdCustomer = await this.customerModel.create(customer);
    return this.fromModelToDomain(createdCustomer);
  }

  fromDomainToModel(domain: Customer): CreationAttributes<CustomerModel> {
    return {
      address_line_1: domain.getAddress().addressLine1,
      city: domain.getAddress().city,
      country: domain.getAddress().country,
      email: domain.getEmail(),
      full_name: domain.getFullName(),
      phone_number: domain.getAddress().phoneNumber,
    };
  }

  fromModelToDomain(this: void, model: CustomerModel): Customer {
    return new Customer({
      address: {
        addressLine1: model.address_line_1,
        city: model.city,
        country: model.country,
        phoneNumber: model.phone_number,
      },
      email: model.email,
      fullName: model.full_name,
      id: model.id,
    });
  }
}
