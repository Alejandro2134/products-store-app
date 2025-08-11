import { NotFoundError } from '@application/errors/NotFundError';
import { GetTransactionByIdPort } from '@application/ports/in/TransactionPorts';
import { Transaction } from '@domain/entities/Transaction';
import { TransactionPort } from '@domain/ports/out/TransactionPort';

export class GetTransactionById implements GetTransactionByIdPort {
  constructor(private readonly transactionAdapter: TransactionPort) {}

  async execute(id: number): Promise<Transaction> {
    const transaction = await this.transactionAdapter.findById(id);
    if (!transaction)
      throw new NotFoundError(`Transaction with id ${id} not found`);

    return transaction;
  }
}
