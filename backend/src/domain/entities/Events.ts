interface ITransactionUpdated {
  event: 'transaction.updated';
  sentAt: string;
  signature: ISignature;
  transaction: ITransaction;
  timestamp: number;
}

interface ISignature {
  checksum: string;
  properties: string[];
}

export enum TransactionStatus {
  APPROVED = 'APPROVED',
  PROCESSING = 'PROCESSING',
  PENDING = 'PENDING',
  FAILED = 'FAILED',
  REJECTED = 'REJECTED',
}

export enum Event {
  TRANSACTION_UPDATED = 'transaction.updated',
}

interface ITransaction {
  id: string;
  status: string;
  reference: string;
  amountInCents: number;
}

export class TransactionUpdated {
  private event: 'transaction.updated';
  private sentAt: string;
  private signature: ISignature;
  private transaction: ITransaction;
  private timestamp: number;

  constructor(item: ITransactionUpdated) {
    this.event = item.event;
    this.sentAt = item.sentAt;
    this.signature = item.signature;
    this.transaction = item.transaction;
    this.timestamp = item.timestamp;
  }

  getEvent() {
    return this.event;
  }

  getSentAt() {
    return this.sentAt;
  }

  getSignature() {
    return this.signature;
  }

  getTransaction() {
    return this.transaction;
  }

  getTimestamp() {
    return this.timestamp;
  }
}
