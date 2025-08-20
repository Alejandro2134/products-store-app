import { SecurityUtilPorts } from '@application/ports/in/SecurityUtilPorts';
import { VerifyIfSignatureIsValidPort } from '@application/ports/in/WebhookPorts';
import { TransactionUpdated } from '@domain/entities/Events';

export class VerifyIfSignatureIsValid implements VerifyIfSignatureIsValidPort {
  constructor(private readonly securityUtils: SecurityUtilPorts) {}

  isSignatureValid(item: TransactionUpdated): boolean {
    const transactionObj = item.getTransaction() as Record<string, any>;
    const values: string[] = [];

    item.getSignature().properties.forEach((property) => {
      const key = property.replace('transaction.', '');
      const value: unknown = transactionObj[key];
      values.push(String(value));
    });

    values.push(item.getTimestamp().toString());
    values.push(process.env.PAYMENT_EVENTS_SECRET || '');

    const hash = this.securityUtils.generateHash(values);
    if (hash !== item.getSignature().checksum) return false;

    return true;
  }
}
