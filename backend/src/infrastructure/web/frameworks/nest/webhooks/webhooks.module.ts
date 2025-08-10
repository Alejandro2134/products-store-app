import { Module } from '@nestjs/common';
import { WebhooksController } from './webhooks.controller';
import { SecurityUtils } from '@infrastructure/utils/SecurityUtils';
import { TransactionAdapter } from '@infrastructure/persistency/orm/sequelize/adapters/TransactionsAdapter';
import { ProductAdapter } from '@infrastructure/persistency/orm/sequelize/adapters/ProductAdapter';
import { DBTransactionAdapter } from '@infrastructure/persistency/orm/sequelize/adapters/DBTransactionAdapter';
import { SequelizeModule } from '@nestjs/sequelize';
import { Transaction } from '@infrastructure/persistency/orm/sequelize/models/Transaction';
import { Product } from '@infrastructure/persistency/orm/sequelize/models/Product';
import { DeliveryAdapter } from '@infrastructure/persistency/orm/sequelize/adapters/DeliveryAdapter';
import { CustomerAdapter } from '@infrastructure/persistency/orm/sequelize/adapters/CustomerAdapter';
import { Delivery } from '@infrastructure/persistency/orm/sequelize/models/Delivery';
import { Customer } from '@infrastructure/persistency/orm/sequelize/models/Customer';

@Module({
  controllers: [WebhooksController],
  providers: [
    SecurityUtils,
    TransactionAdapter,
    ProductAdapter,
    DBTransactionAdapter,
    DeliveryAdapter,
    CustomerAdapter,
  ],
  imports: [
    SequelizeModule.forFeature([Transaction]),
    SequelizeModule.forFeature([Product]),
    SequelizeModule.forFeature([Delivery]),
    SequelizeModule.forFeature([Customer]),
  ],
})
export class WebhooksModule {}
