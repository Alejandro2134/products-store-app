import { SecurityUtilPorts } from '@application/ports/in/SecurityUtilPorts';
import { createHash } from 'crypto';

export class SecurityUtils implements SecurityUtilPorts {
  generateHash(data: string[]): string {
    const fullString = data.join('');
    return createHash('sha256').update(fullString).digest('hex');
  }
}
