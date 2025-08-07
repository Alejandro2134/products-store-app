import { ApiProperty } from '@nestjs/swagger';

export enum TransactionStatus {
  APPROVED = 'APPROVED',
  PROCESSING = 'PROCESSING',
  PENDING = 'PENDING',
  FAILED = 'FAILED',
  REJECTED = 'REJECTED',
}

export enum WebhookEvent {
  TRANSACTION_UPDATED = 'transaction.updated',
}

class Transaction {
  @ApiProperty({ example: '1234567890' })
  id: string;

  @ApiProperty({
    enum: ['APPROVED', 'PROCESSING', 'PENDING', 'FAILED', 'REJECTED'],
  })
  status: TransactionStatus;

  @ApiProperty({ example: '13445566' })
  reference: string;

  @ApiProperty({ example: 123434 })
  amount_in_cents: number;
}

class Signature {
  @ApiProperty()
  checksum: string;

  @ApiProperty({ type: [String] })
  properties: string[];
}

export class TransactionUpdatedDTO {
  @ApiProperty({ enum: ['transaction.updated'] })
  event: WebhookEvent;

  @ApiProperty()
  sent_at: string;

  @ApiProperty({ type: () => Signature })
  signature: Signature;

  @ApiProperty({ type: () => Transaction })
  transaction: Transaction;

  @ApiProperty({ example: 12312312 })
  timestamp: number;
}
