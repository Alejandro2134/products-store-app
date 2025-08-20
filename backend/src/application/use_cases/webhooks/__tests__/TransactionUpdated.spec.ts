import { SecurityUtilPorts } from '@application/ports/in/SecurityUtilPorts';
import { TransactionPort } from '@domain/ports/out/TransactionPort';
import { ProductPort } from '@domain/ports/out/ProductPort';
import { DBTransactionPort } from '@domain/ports/out/DBTransactionPort';
import { DeliveryPort } from '@domain/ports/out/DeliveryPort';
import { CustomerPort } from '@domain/ports/out/CustomerPort';
import { TransactionUpdated as TransactionUpdatedEvent } from '@domain/entities/Events';
import { TransactionUpdated } from '../TransactionUpdated';
import { Transaction } from '@domain/entities/Transaction';
import { Delivery } from '@domain/entities/Delivery';
import { Customer } from '@domain/entities/Customer';
import { Product } from '@domain/entities/Product';

describe('Transaction updated webhook use case', () => {
  it('should handle the logic when the transaction is in APPROVED status', async () => {
    //Arrange
    const event = new TransactionUpdatedEvent({
      event: 'transaction.updated',
      sentAt: '',
      signature: {
        checksum: 'checksum',
        properties: [],
      },
      timestamp: 10000,
      transaction: {
        amountInCents: 1000,
        id: '1',
        reference: 'xxxxxxxxxxx',
        status: 'APPROVED',
      },
    });

    const transaction = new Transaction({
      amountInCents: 1000,
      id: 1,
      reference: 'xxxxxxxxxxx',
      status: 'PENDING',
      customerId: 1,
      paymentGatewayTransactionId: '1',
      productAmount: 3,
      productId: 1,
    });

    const delivery = new Delivery({
      customerId: 1,
      productId: 1,
      transactionId: 1,
    });

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

    const product = new Product({
      currency: 'COP',
      description: 'A Guitar with 8 strings :o',
      name: 'Guitar',
      priceInCents: 1000,
      stock: 10,
      id: 1,
    });

    const securityUtils: SecurityUtilPorts = {
      generateHash: jest.fn().mockReturnValue('checksum'),
    };

    const transactionAdapter: TransactionPort = {
      create: jest.fn(),
      findById: jest.fn().mockReturnValue(transaction),
      findByReference: jest.fn().mockReturnValue(transaction),
      updateById: jest.fn(),
    };

    const productAdapter: ProductPort = {
      findAll: jest.fn(),
      findById: jest.fn().mockReturnValue(product),
      updateById: jest.fn(),
    };

    const dbTransactionsAdapter: DBTransactionPort = {
      createTransaction: async (fn) => {
        return await fn(undefined);
      },
    };

    const deliveryAdapter: DeliveryPort = {
      create: jest.fn().mockReturnValue(delivery),
      findAll: jest.fn(),
    };

    const customerAdapter: CustomerPort = {
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn().mockReturnValue(customer),
    };

    const useCase = new TransactionUpdated(
      securityUtils,
      transactionAdapter,
      productAdapter,
      dbTransactionsAdapter,
      deliveryAdapter,
      customerAdapter,
    );

    //Act
    await useCase.execute(event);

    //Assert
    expect(deliveryAdapter.create).toHaveBeenCalledWith(delivery, undefined);
    expect(securityUtils.generateHash).toHaveBeenCalledWith(['10000', '']);
    expect(transactionAdapter.findByReference).toHaveBeenCalled();
    expect(transactionAdapter.updateById).toHaveBeenCalledWith(
      1,
      { status: 'APPROVED' },
      undefined,
    );
    expect(deliveryAdapter.create).toHaveBeenCalledWith(delivery, undefined);
  });

  it('should handle the logic when the transaction is in a status different than APPROVED', async () => {
    //Arrange
    const event = new TransactionUpdatedEvent({
      event: 'transaction.updated',
      sentAt: '',
      signature: {
        checksum: 'checksum',
        properties: [],
      },
      timestamp: 10000,
      transaction: {
        amountInCents: 1000,
        id: '1',
        reference: 'xxxxxxxxxxx',
        status: 'REJECTED',
      },
    });

    const transaction = new Transaction({
      amountInCents: 1000,
      id: 1,
      reference: 'xxxxxxxxxxx',
      status: 'PENDING',
      customerId: 1,
      paymentGatewayTransactionId: '1',
      productAmount: 3,
      productId: 1,
      product: {
        currency: 'COP',
        description: 'A Guitar with 8 strings :o',
        name: 'Guitar',
        priceInCents: 1000,
        stock: 10,
        id: 1,
      },
    });

    const securityUtils: SecurityUtilPorts = {
      generateHash: jest.fn().mockReturnValue('checksum'),
    };

    const transactionAdapter: TransactionPort = {
      create: jest.fn(),
      findById: jest.fn(),
      findByReference: jest.fn().mockReturnValue(transaction),
      updateById: jest.fn(),
    };

    const productAdapter: ProductPort = {
      findAll: jest.fn(),
      findById: jest.fn(),
      updateById: jest.fn(),
    };

    const dbTransactionsAdapter: DBTransactionPort = {
      createTransaction: async (fn) => {
        return await fn(undefined);
      },
    };

    const deliveryAdapter: DeliveryPort = {
      create: jest.fn(),
      findAll: jest.fn(),
    };

    const customerAdapter: CustomerPort = {
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
    };

    const useCase = new TransactionUpdated(
      securityUtils,
      transactionAdapter,
      productAdapter,
      dbTransactionsAdapter,
      deliveryAdapter,
      customerAdapter,
    );

    //Act
    await useCase.execute(event);

    //Assert
    expect(securityUtils.generateHash).toHaveBeenCalledWith(['10000', '']);
    expect(transactionAdapter.findByReference).toHaveBeenCalled();
    expect(transactionAdapter.updateById).toHaveBeenCalledWith(
      1,
      { status: 'REJECTED' },
      undefined,
    );
    expect(productAdapter.updateById).toHaveBeenCalled();
  });
});
