import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionAdapter } from '@infrastructure/persistency/orm/sequelize/adapters/TransactionsAdapter';
import { SequelizeModule } from '@nestjs/sequelize';
import { Transaction } from '@infrastructure/persistency/orm/sequelize/models/Transaction';
import { PaymentGatewayAdapter } from '@infrastructure/integrations/payments/adapters/PaymentGatewayAdapter';
import { ProductAdapter } from '@infrastructure/persistency/orm/sequelize/adapters/ProductAdapter';
import { CustomerAdapter } from '@infrastructure/persistency/orm/sequelize/adapters/CustomerAdapter';
import { Product } from '@infrastructure/persistency/orm/sequelize/models/Product';
import { Customer } from '@infrastructure/persistency/orm/sequelize/models/Customer';
import { DBTransactionAdapter } from '@infrastructure/persistency/orm/sequelize/adapters/DBTransactionAdapter';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [TransactionsController],
  providers: [
    TransactionAdapter,
    PaymentGatewayAdapter,
    ProductAdapter,
    CustomerAdapter,
    DBTransactionAdapter,
  ],
  imports: [
    SequelizeModule.forFeature([Transaction]),
    SequelizeModule.forFeature([Product]),
    SequelizeModule.forFeature([Customer]),
    HttpModule,
  ],
})
export class TransactionsModule {}
