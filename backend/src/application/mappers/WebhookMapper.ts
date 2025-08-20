import { TransactionUpdated } from '@domain/entities/Events';
import { MapperDTO } from './Mapper';
import { TransactionUpdatedDTO } from '@application/dto/Webhooks';

export class WebhookMapper
  implements MapperDTO<TransactionUpdated, TransactionUpdatedDTO>
{
  fromDTOToDomain(dto: TransactionUpdatedDTO): TransactionUpdated {
    return new TransactionUpdated({
      event: dto.event,
      sentAt: dto.sent_at,
      signature: {
        checksum: dto.signature.checksum,
        properties: dto.signature.properties,
      },
      timestamp: dto.timestamp,
      transaction: {
        amountInCents: dto.transaction.amount_in_cents,
        id: dto.transaction.id,
        reference: dto.transaction.reference,
        status: dto.transaction.status,
      },
    });
  }
}
