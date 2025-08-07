import { Module } from '@nestjs/common';
import { WebhooksController } from './webhooks.controller';
import { SecurityUtils } from '@infrastructure/utils/SecurityUtils';
import { TransactionAdapter } from '@infrastructure/persistency/orm/sequelize/adapters/TransactionsAdapter';
import { ProductAdapter } from '@infrastructure/persistency/orm/sequelize/adapters/ProductAdapter';
import { DBTransactionAdapter } from '@infrastructure/persistency/orm/sequelize/adapters/DBTransactionAdapter';
import { SequelizeModule } from '@nestjs/sequelize';
import { Transaction } from '@infrastructure/persistency/orm/sequelize/models/Transaction';
import { Product } from '@infrastructure/persistency/orm/sequelize/models/Product';

@Module({
  controllers: [WebhooksController],
  providers: [
    SecurityUtils,
    TransactionAdapter,
    ProductAdapter,
    DBTransactionAdapter,
  ],
  imports: [
    SequelizeModule.forFeature([Transaction]),
    SequelizeModule.forFeature([Product]),
  ],
})
export class WebhooksModule {}
