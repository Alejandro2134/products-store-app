import { TransactionUpdatedDTO } from '@application/dto/Webhooks';
import { WebhookMapper } from '@application/mappers/WebhookMapper';
import { TransactionUpdatedPort } from '@application/ports/in/WebhookPorts';
import { TransactionUpdated } from '@application/use_cases/webhooks/TransactionUpdated';
import { CustomerAdapter } from '@infrastructure/persistency/orm/sequelize/adapters/CustomerAdapter';
import { DBTransactionAdapter } from '@infrastructure/persistency/orm/sequelize/adapters/DBTransactionAdapter';
import { DeliveryAdapter } from '@infrastructure/persistency/orm/sequelize/adapters/DeliveryAdapter';
import { ProductAdapter } from '@infrastructure/persistency/orm/sequelize/adapters/ProductAdapter';
import { TransactionAdapter } from '@infrastructure/persistency/orm/sequelize/adapters/TransactionsAdapter';
import { SecurityUtils } from '@infrastructure/utils/SecurityUtils';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('webhooks')
@Controller('webhooks')
export class WebhooksController {
  private readonly webhookMapper = new WebhookMapper();
  private readonly transactionUpdated: TransactionUpdatedPort;

  constructor(
    securityUtils: SecurityUtils,
    transactionAdapter: TransactionAdapter,
    productAdapter: ProductAdapter,
    dbTransactionAdapter: DBTransactionAdapter,
    deliveryAdapter: DeliveryAdapter,
    customerAdapter: CustomerAdapter,
  ) {
    this.transactionUpdated = new TransactionUpdated(
      securityUtils,
      transactionAdapter,
      productAdapter,
      dbTransactionAdapter,
      deliveryAdapter,
      customerAdapter,
    );
  }

  @Post('/payments/transaction-updated')
  @HttpCode(200)
  checkTransactionUpdatedInfo(@Body() transactionInfo: TransactionUpdatedDTO) {
    const transactionUpdatedDomain =
      this.webhookMapper.fromDTOToDomain(transactionInfo);
    return this.transactionUpdated.execute(transactionUpdatedDomain);
  }
}
