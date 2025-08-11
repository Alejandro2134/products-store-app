import { CustomerPort } from '@domain/ports/out/CustomerPort';
import { CreateCustomer } from '../CreateCustomer';
import { Customer } from '@domain/entities/Customer';

describe('Create customer use case', () => {
  it('should create a customer successfully', async () => {
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
      create: jest.fn().mockResolvedValue(customer),
      findAll: jest.fn().mockResolvedValue([]),
      findById: jest.fn(),
    };

    const useCase = new CreateCustomer(customerAdapter);

    //Act
    const res = await useCase.execute(customer);

    //Assert
    expect(res).toBe(customer);
    expect(customerAdapter.findAll).toHaveBeenCalled();
    expect(customerAdapter.create).toHaveBeenCalled();
  });

  it('should throw an error if a customer with the provided email already exists', async () => {
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
      findAll: jest.fn().mockResolvedValue([customer]),
      findById: jest.fn(),
    };

    const useCase = new CreateCustomer(customerAdapter);

    //Act & Assert
    await expect(useCase.execute(customer)).rejects.toThrow(
      'A customer with the provided email already exists',
    );
  });
});
