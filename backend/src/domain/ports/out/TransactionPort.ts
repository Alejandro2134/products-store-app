import { Transaction } from '@domain/entities/Transaction';

export interface TransactionPort {
  create(item: Transaction, t?: unknown): Promise<Transaction>;
  findById(id: number): Promise<Transaction | null>;
}
