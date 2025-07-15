import { Customer, ICustomerFilter } from '@domain/entities/Customer';

export interface CustomerPort {
  create(item: Customer): Promise<Customer>;
  findAll(filter: ICustomerFilter): Promise<Customer[]>;
}
