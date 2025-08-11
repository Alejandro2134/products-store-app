import { Customer, ICustomerFilter } from '@domain/entities/Customer';

export interface CreateCustomerPort {
  execute(item: Customer): Promise<Customer>;
}

export interface GetCustomersPort {
  execute(filter: ICustomerFilter): Promise<Customer[]>;
}

export interface GetCustomerByIdPort {
  execute(id: number, t?: unknown): Promise<Customer>;
}
