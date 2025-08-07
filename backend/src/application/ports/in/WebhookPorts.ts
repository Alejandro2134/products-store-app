import { TransactionUpdatedDTO } from '@application/dto/Webhooks';

export interface TransactionUpdatedPort {
  execute(item: TransactionUpdatedDTO): Promise<void>;
}

export interface VerifyIfSignatureIsValidPort {
  isSignatureValid(item: TransactionUpdatedDTO): boolean;
}
