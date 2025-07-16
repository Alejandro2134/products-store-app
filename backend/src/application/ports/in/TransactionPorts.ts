import {
  CreateTransactionDTO,
  TransactionDTO,
} from '@application/dto/Transaction';

export interface CreateTransactionsPort {
  execute(item: CreateTransactionDTO): Promise<TransactionDTO>;
}
