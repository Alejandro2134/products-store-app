import { TransactionPort } from '@domain/ports/out/TransactionPort';
import { UpdateTransactionStatus } from '../UpdateTransactionStatus';
import { Transaction } from '@domain/entities/Transaction';

describe('Update transaction status use case', () => {
  it('should update the transaction status successfully', async () => {
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
      findByReference: jest.fn(),
      updateById: jest.fn(),
    };

    const useCase = new UpdateTransactionStatus(transactionAdapter);

    //Act
    await useCase.execute(transaction, 1, 'APPROVED');

    //Assert
    expect(transactionAdapter.updateById).toHaveBeenCalled();
    expect(transaction.getStatus()).toBe('APPROVED');
  });

  it('should throw an error if the transaction is already in the state passed as a parameter', async () => {
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
      findByReference: jest.fn(),
      updateById: jest.fn(),
    };

    const useCase = new UpdateTransactionStatus(transactionAdapter);

    //Act & Assert
    await expect(useCase.execute(transaction, 1, 'PENDING')).rejects.toThrow(
      'Status is already set to the same value',
    );
  });

  it('should throw an error if a transaction in status APPROVED or REJECTED is changed to PENDING', async () => {
    //Arrange
    const transaction = new Transaction({
      amountInCents: 100000,
      customerId: 1,
      paymentGatewayTransactionId: 'xxxxxxxxxx',
      productAmount: 4,
      productId: 1,
      reference: 'REF-123123',
      status: 'APPROVED',
      id: 1,
    });

    const transactionAdapter: TransactionPort = {
      create: jest.fn(),
      findById: jest.fn(),
      findByReference: jest.fn(),
      updateById: jest.fn(),
    };

    const useCase = new UpdateTransactionStatus(transactionAdapter);

    //Act & Assert
    await expect(useCase.execute(transaction, 1, 'PENDING')).rejects.toThrow(
      'Cannot change status from APPROVED or REJECTED',
    );
  });
});
