import { NotFoundError } from '@application/errors/NotFundError';
import { GetTransactionByReferencePort } from '@application/ports/in/TransactionPorts';
import { Transaction } from '@domain/entities/Transaction';
import { TransactionPort } from '@domain/ports/out/TransactionPort';

export class GetTransactionByReference
  implements GetTransactionByReferencePort
{
  constructor(private readonly transactionAdapter: TransactionPort) {}

  async execute(reference: string): Promise<Transaction> {
    const transaction =
      await this.transactionAdapter.findByReference(reference);

    if (!transaction)
      throw new NotFoundError(
        `Transaction with reference ${reference} not found`,
      );

    return transaction;
  }
}
