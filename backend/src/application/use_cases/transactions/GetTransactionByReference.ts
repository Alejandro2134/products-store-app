import { TransactionDTO } from '@application/dto/Transaction';
import { NotFoundError } from '@application/errors/NotFundError';
import { TransactionMapper } from '@application/mappers/TransactionMapper';
import { GetTransactionByReferencePort } from '@application/ports/in/TransactionPorts';
import { TransactionPort } from '@domain/ports/out/TransactionPort';

export class GetTransactionByReference
  implements GetTransactionByReferencePort
{
  private transactionMapper = new TransactionMapper();

  constructor(private readonly transactionAdapter: TransactionPort) {}

  async execute(reference: string): Promise<TransactionDTO> {
    const transaction =
      await this.transactionAdapter.findByReference(reference);

    if (!transaction)
      throw new NotFoundError(
        `Transaction with reference ${reference} not found`,
      );

    return this.transactionMapper.fromDomainToDTO(transaction);
  }
}
