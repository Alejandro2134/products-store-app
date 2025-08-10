import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from '@infrastructure/persistency/orm/sequelize/models/Product';
import { ProductsModule } from '@infrastructure/web/frameworks/nest/products/products.module';
import { Transaction } from '@infrastructure/persistency/orm/sequelize/models/Transaction';
import { Delivery } from '@infrastructure/persistency/orm/sequelize/models/Delivery';
import { Customer } from '@infrastructure/persistency/orm/sequelize/models/Customer';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { CustomersModule } from '@infrastructure/web/frameworks/nest/customers/customers.module';
import { TransactionsModule } from './transactions/transactions.module';
import { WebhooksModule } from './webhooks/webhooks.module';
import { DeliveriesModule } from './deliveries/deliveries.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: 5432,
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || 'secret',
      database: process.env.DB_NAME || 'products_store',
      models: [Product, Transaction, Delivery, Customer],
    }),
    HttpModule,
    ProductsModule,
    CustomersModule,
    TransactionsModule,
    WebhooksModule,
    DeliveriesModule,
  ],
})
export class AppModule {}
