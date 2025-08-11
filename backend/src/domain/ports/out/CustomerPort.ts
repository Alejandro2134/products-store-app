import { Customer, ICustomerFilter } from '@domain/entities/Customer';

export interface CustomerPort {
  create(this: void, item: Customer): Promise<Customer>;
  findAll(this: void, filter: ICustomerFilter): Promise<Customer[]>;
  findById(this: void, id: number, t?: unknown): Promise<Customer | null>;
}
