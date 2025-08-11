import { Customer } from '@domain/entities/Customer';
import { CustomerPort } from '@domain/ports/out/CustomerPort';
import { GetCustomerById } from '../GetCustomerById';

describe('Get customer by id use case', () => {
  it('should get the customer with the provided id', async () => {
    //Arrange
    const customer = new Customer({
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
    });

    const customerAdapter: CustomerPort = {
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn().mockReturnValue(customer),
    };

    const useCase = new GetCustomerById(customerAdapter);

    //Act
    const res = await useCase.execute(1);

    //Assert
    expect(res).toBe(customer);
    expect(customerAdapter.findById).toHaveBeenCalled();
  });

  it('should throw an error if the customer with the provided id dont exist', async () => {
    //Arrange
    const customerAdapter: CustomerPort = {
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn().mockReturnValue(null),
    };

    const useCase = new GetCustomerById(customerAdapter);

    //Act & Assert
    await expect(useCase.execute(32)).rejects.toThrow(
      'Customer with id 32 not found',
    );
  });
});
