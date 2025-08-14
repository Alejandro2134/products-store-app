import { ITransactionUpdate, Transaction } from '@domain/entities/Transaction';

export interface TransactionPort {
  create(this: void, item: Transaction, t?: unknown): Promise<Transaction>;
  findById(this: void, id: number, t?: unknown): Promise<Transaction | null>;
  updateById(
    this: void,
    id: number,
    item: ITransactionUpdate,
    t?: unknown,
  ): Promise<void>;
  findByReference(
    this: void,
    reference: string,
    t?: unknown,
  ): Promise<Transaction | null>;
}
