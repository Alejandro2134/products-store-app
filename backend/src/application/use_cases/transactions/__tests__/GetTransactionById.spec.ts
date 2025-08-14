import { TransactionPort } from '@domain/ports/out/TransactionPort';
import { GetTransactionById } from '../GetTransactionById';
import { Transaction } from '@domain/entities/Transaction';

describe('Get transaction by id use case', () => {
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
      findById: jest.fn().mockReturnValue(transaction),
      findByReference: jest.fn(),
      updateById: jest.fn(),
    };

    const useCase = new GetTransactionById(transactionAdapter);

    //Act
    const res = await useCase.execute(1);

    //Assert
    expect(res).toBe(transaction);
    expect(transactionAdapter.findById).toHaveBeenCalled();
  });

  it('should throw an error if the transaction with the provided id dont exist', async () => {
    //Arrange
    const transactionAdapter: TransactionPort = {
      create: jest.fn(),
      findById: jest.fn().mockReturnValue(null),
      findByReference: jest.fn(),
      updateById: jest.fn(),
    };

    const useCase = new GetTransactionById(transactionAdapter);

    //Act & Assert
    await expect(useCase.execute(2)).rejects.toThrow(
      'Transaction with id 2 not found',
    );
  });
});
