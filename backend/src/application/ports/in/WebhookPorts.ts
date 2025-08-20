import { TransactionUpdated } from '@domain/entities/Events';

export interface TransactionUpdatedPort {
  execute(item: TransactionUpdated): Promise<void>;
}

export interface VerifyIfSignatureIsValidPort {
  isSignatureValid(item: TransactionUpdated): boolean;
}
