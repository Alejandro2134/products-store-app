import { TransactionDTO } from '@application/dto/Transaction';
import { BadRequestError } from '@application/errors/BadRequestError';
import { TransactionMapper } from '@application/mappers/TransactionMapper';
import { UpdateTransactionStatusPort } from '@application/ports/in/TransactionPorts';
import { TransactionPort } from '@domain/ports/out/TransactionPort';

export class UpdateTransactionStatus implements UpdateTransactionStatusPort {
  private transactionMapper = new TransactionMapper();

  constructor(private readonly transactionAdapter: TransactionPort) {}

  async execute(
    item: TransactionDTO,
    status: string,
    t?: unknown,
  ): Promise<void> {
    const transaction = this.transactionMapper.fromDTOToDomain(item);
    const res = transaction.setStatus(status);
    if (!res.success) throw new BadRequestError(res.reason);

    await this.transactionAdapter.updateById(
      item.id,
      { status: transaction.getStatus() },
      t,
    );
  }
}
