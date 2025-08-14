import { DeliveryPort } from '@domain/ports/out/DeliveryPort';
import { CreateDelivery } from '../CreateDelivery';
import { TransactionPort } from '@domain/ports/out/TransactionPort';
import { ProductPort } from '@domain/ports/out/ProductPort';
import { CustomerPort } from '@domain/ports/out/CustomerPort';
import { Delivery } from '@domain/entities/Delivery';

describe('Create delivery use case', () => {
  it('should create a delivery successfully', async () => {
    //Arrange
    const delivery = new Delivery({
      customerId: 1,
      productId: 2,
      transactionId: 3,
    });

    const deliveryAdapter: DeliveryPort = {
      create: jest.fn().mockReturnValue(delivery),
      findAll: jest.fn(),
    };
    const transactionAdapter: TransactionPort = {
      create: jest.fn(),
      findById: jest.fn().mockReturnValue({}),
      findByReference: jest.fn(),
      updateById: jest.fn(),
    };
    const productAdapter: ProductPort = {
      findAll: jest.fn(),
      findById: jest.fn().mockReturnValue({}),
      updateById: jest.fn(),
    };
    const customerAdapter: CustomerPort = {
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn().mockReturnValue({}),
    };

    const useCase = new CreateDelivery(
      deliveryAdapter,
      transactionAdapter,
      productAdapter,
      customerAdapter,
    );

    //Act
    const res = await useCase.execute(delivery);

    //Assert
    expect(res).toBe(delivery);
    expect(deliveryAdapter.create).toHaveBeenCalled();
    expect(productAdapter.findById).toHaveBeenCalledWith(2, undefined, false);
    expect(customerAdapter.findById).toHaveBeenCalledWith(1, undefined);
    expect(transactionAdapter.findById).toHaveBeenCalledWith(3);
  });
});
