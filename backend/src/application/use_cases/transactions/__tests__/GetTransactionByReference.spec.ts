import { Transaction } from '@domain/entities/Transaction';
import { TransactionPort } from '@domain/ports/out/TransactionPort';
import { GetTransactionByReference } from '../GetTransactionByReference';

describe('Get transaction by reference use case', () => {
  it('should get the transaction with the provided id', async () => {
    //Arrange
    const transaction = new Transaction({
      amountInCents: 100000,
      customerId: 1,
      paymentGatewayTransactionId: 'xxxxxxxxxx',
      productAmount: 4,
      productId: 1,
      reference: 'REF-123123',
      status: 'PENDING',
      id: 1,
    });

    const transactionAdapter: TransactionPort = {
      create: jest.fn(),
      findById: jest.fn(),
      findByReference: jest.fn().mockReturnValue(transaction),
      updateById: jest.fn(),
    };

    const useCase = new GetTransactionByReference(transactionAdapter);

    //Act
    const res = await useCase.execute('REF-123123');

    //Assert
    expect(res).toBe(transaction);
    expect(transactionAdapter.findByReference).toHaveBeenCalled();
  });

  it('should throw an error if the transaction with the provided id dont exist', async () => {
    //Arrange
    const transactionAdapter: TransactionPort = {
      create: jest.fn(),
      findById: jest.fn().mockReturnValue(null),
      findByReference: jest.fn(),
      updateById: jest.fn(),
    };

    const useCase = new GetTransactionByReference(transactionAdapter);

    //Act & Assert
    await expect(useCase.execute('REF-123123')).rejects.toThrow(
      'Transaction with reference REF-123123 not found',
    );
  });
});
