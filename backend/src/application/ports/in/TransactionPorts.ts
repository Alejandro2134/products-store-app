import { Transaction } from '@domain/entities/Transaction';

export interface CreateTransactionsPort {
  execute(item: Transaction): Promise<Transaction>;
}

export interface GetTransactionByIdPort {
  execute(id: number, t?: unknown): Promise<Transaction>;
}

export interface GetTransactionByReferencePort {
  execute(reference: string, t?: unknown): Promise<Transaction>;
}

export interface UpdateTransactionStatusPort {
  execute(
    item: Transaction,
    id: number,
    status: string,
    t?: unknown,
  ): Promise<void>;
}
