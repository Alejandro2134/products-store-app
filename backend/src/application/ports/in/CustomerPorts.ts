import { CustomerDTO, ICustomerFilter } from '@application/dto/Customer';

export interface CreateCustomerPort {
  execute(item: CustomerDTO): Promise<CustomerDTO>;
}

export interface GetCustomersPort {
  execute(filter: ICustomerFilter): Promise<CustomerDTO[]>;
}

export interface GetCustomerByIdPort {
  execute(id: number, t?: unknown): Promise<CustomerDTO>;
}
