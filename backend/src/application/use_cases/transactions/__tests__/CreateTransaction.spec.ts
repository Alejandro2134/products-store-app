import { TransactionPort } from '@domain/ports/out/TransactionPort';
import { CreateTransaction } from '../CreateTransaction';
import { PaymentGatewayPort } from '@domain/ports/out/PaymentGatewayPort';
import { ProductPort } from '@domain/ports/out/ProductPort';
import { CustomerPort } from '@domain/ports/out/CustomerPort';
import { DBTransactionPort } from '@domain/ports/out/DBTransactionPort';
import { Transaction } from '@domain/entities/Transaction';
import { Product } from '@domain/entities/Product';
import { Customer } from '@domain/entities/Customer';
import { Payment } from '@domain/entities/Payment';

describe('Create transaction use case', () => {
  it('should create a transaction successfully', async () => {
    //Arrange
    const product = new Product({
      currency: 'COP',
      description: 'A really amazing guitar!',
      name: 'Guitar',
      priceInCents: 100000,
      stock: 20,
      id: 3,
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

    const transaction = new Transaction({
      amountInCents: 0,
      customerId: customer.getId(),
      paymentGatewayTransactionId: '',
      productAmount: 4,
      productId: product.getId()!,
      reference: '',
      status: 'PENDING',
    });

    const payment = new Payment({
      amount: transaction.getProductAmount() * product.getPriceInCents(),
      currency: 'COP',
      customerFullName: '',
      customerAddressLine1: customer.getAddress().addressLine1,
      customerCity: customer.getAddress().city,
      customerCountry: customer.getAddress().country,
      customerEmail: customer.getEmail(),
      customerPhoneNumber: customer.getAddress().phoneNumber,
      customerRegion: customer.getAddress().region,
      method: 'CARD',
      token: '',
      id: 'xxxxxxxxxx',
      reference: 'REF-123123',
    });

    const transactionAdapter: TransactionPort = {
      create: jest.fn().mockReturnValue(transaction),
      findById: jest.fn(),
      findByReference: jest.fn(),
      updateById: jest.fn(),
    };

    const paymentGatewayAdapter: PaymentGatewayPort = {
      getAcceptanceToken: jest.fn().mockReturnValue('acceptance_token'),
      startPayment: jest.fn().mockReturnValue(payment),
    };

    const productAdapter: ProductPort = {
      findAll: jest.fn(),
      findById: jest.fn().mockReturnValue(product),
      updateById: jest.fn(),
    };

    const customerAdapter: CustomerPort = {
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn().mockReturnValue(customer),
    };

    const dbTransactionAdapter: DBTransactionPort = {
      createTransaction: async (fn) => {
        return await fn(undefined);
      },
    };

    const useCase = new CreateTransaction(
      transactionAdapter,
      paymentGatewayAdapter,
      productAdapter,
      customerAdapter,
      dbTransactionAdapter,
    );

    //Act
    const res = await useCase.execute(transaction);

    //Assert
    expect(res.getAmountInCents()).toBe(
      transaction.getProductAmount() * product.getPriceInCents(),
    );
    expect(res.getReference()).toBe('REF-123123');
    expect(res.getPaymentGatewayTransactionId()).toBe('xxxxxxxxxx');
    expect(transactionAdapter.create).toHaveBeenCalled();
  });
});
