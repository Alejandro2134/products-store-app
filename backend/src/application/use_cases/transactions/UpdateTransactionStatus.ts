import { BadRequestError } from '@application/errors/BadRequestError';
import { UpdateTransactionStatusPort } from '@application/ports/in/TransactionPorts';
import { Transaction } from '@domain/entities/Transaction';
import { TransactionPort } from '@domain/ports/out/TransactionPort';

export class UpdateTransactionStatus implements UpdateTransactionStatusPort {
  constructor(private readonly transactionAdapter: TransactionPort) {}

  async execute(
    item: Transaction,
    id: number,
    status: string,
    t?: unknown,
  ): Promise<void> {
    const res = item.setStatus(status);
    if (!res.success) throw new BadRequestError(res.reason);

    await this.transactionAdapter.updateById(
      id,
      { status: item.getStatus() },
      t,
    );
  }
}
