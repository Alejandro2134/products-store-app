import { TransactionUpdatedDTO } from '@application/dto/Webhooks';
import { TransactionUpdatedPort } from '@application/ports/in/WebhookPorts';
import { TransactionUpdated } from '@application/use_cases/webhooks/TransactionUpdated';
import { DBTransactionAdapter } from '@infrastructure/persistency/orm/sequelize/adapters/DBTransactionAdapter';
import { ProductAdapter } from '@infrastructure/persistency/orm/sequelize/adapters/ProductAdapter';
import { TransactionAdapter } from '@infrastructure/persistency/orm/sequelize/adapters/TransactionsAdapter';
import { SecurityUtils } from '@infrastructure/utils/SecurityUtils';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('webhooks')
@Controller('webhooks')
export class WebhooksController {
  private readonly transactionUpdated: TransactionUpdatedPort;

  constructor(
    securityUtils: SecurityUtils,
    transactionAdapter: TransactionAdapter,
    productAdapter: ProductAdapter,
    dbTransactionAdapter: DBTransactionAdapter,
  ) {
    this.transactionUpdated = new TransactionUpdated(
      securityUtils,
      transactionAdapter,
      productAdapter,
      dbTransactionAdapter,
    );
  }

  @Post('/payments/transaction-updated')
  @HttpCode(200)
  checkTransactionUpdatedInfo(@Body() transactionInfo: TransactionUpdatedDTO) {
    return this.transactionUpdated.execute(transactionInfo);
  }
}
