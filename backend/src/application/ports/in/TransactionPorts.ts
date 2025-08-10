import {
  CreateTransactionDTO,
  TransactionDTO,
} from '@application/dto/Transaction';

export interface CreateTransactionsPort {
  execute(item: CreateTransactionDTO): Promise<TransactionDTO>;
}

export interface GetTransactionByIdPort {
  execute(id: number, t?: unknown): Promise<TransactionDTO>;
}

export interface GetTransactionByReferencePort {
  execute(reference: string, t?: unknown): Promise<TransactionDTO>;
}

export interface UpdateTransactionStatusPort {
  execute(item: TransactionDTO, status: string, t?: unknown): Promise<void>;
}
