import { TransactionUpdatedDTO } from '@application/dto/Webhooks';
import { SecurityUtilPorts } from '@application/ports/in/SecurityUtilPorts';
import { VerifyIfSignatureIsValidPort } from '@application/ports/in/WebhookPorts';

export class VerifyIfSignatureIsValid implements VerifyIfSignatureIsValidPort {
  constructor(private readonly securityUtils: SecurityUtilPorts) {}

  isSignatureValid(item: TransactionUpdatedDTO): boolean {
    const transactionObj = item.transaction as Record<string, any>;
    const values: string[] = [];

    item.signature.properties.forEach((property) => {
      const key = property.replace('transaction.', '');
      const value: unknown = transactionObj[key];
      values.push(String(value));
    });

    values.push(item.timestamp.toString());
    values.push(process.env.PAYMENT_EVENTS_SECRET || '');

    const hash = this.securityUtils.generateHash(values);
    if (hash !== item.signature.checksum) return false;

    return true;
  }
}
