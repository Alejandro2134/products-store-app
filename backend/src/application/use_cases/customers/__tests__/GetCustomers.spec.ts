import { Customer } from '@domain/entities/Customer';
import { CustomerPort } from '@domain/ports/out/CustomerPort';
import { GetCustomers } from '../GetCustomers';

describe('Get customers use case', () => {
  it('should return a list of customers', async () => {
    //Arrange
    const customers: Customer[] = [
      new Customer({
        address: {
          addressLine1: '123 Main St',
          city: 'Springfield',
          country: 'USA',
          phoneNumber: '123456789',
          region: 'IL',
        },
        email: 'johndoe@example.com',
        fullName: 'John Doe',
        id: 1,
      }),
      new Customer({
        address: {
          addressLine1: '123 Main St',
          city: 'Springfield',
          country: 'USA',
          phoneNumber: '101112131',
          region: 'IL',
        },
        email: 'davidmills@example.com',
        fullName: 'David Mills',
        id: 2,
      }),
    ];

    const customerAdapter: CustomerPort = {
      create: jest.fn(),
      findAll: jest.fn().mockReturnValue(customers),
      findById: jest.fn(),
    };

    const useCase = new GetCustomers(customerAdapter);

    //Act
    const res = await useCase.execute({});

    //Assert
    expect(customers).toBe(res);
    expect(customerAdapter.findAll).toHaveBeenCalledTimes(1);
  });
});
