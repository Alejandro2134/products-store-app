import { ITransactionUpdate, Transaction } from '@domain/entities/Transaction';

export interface TransactionPort {
  create(item: Transaction, t?: unknown): Promise<Transaction>;
  findById(this: void, id: number, t?: unknown): Promise<Transaction | null>;
  updateById(id: number, item: ITransactionUpdate, t?: unknown): Promise<void>;
  findByReference(reference: string, t?: unknown): Promise<Transaction | null>;
}
