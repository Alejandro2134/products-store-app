import { Customer } from '@infrastructure/persistency/orm/sequelize/models/Customer';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CustomerController } from './custromers.controller';
import { CustomerAdapter } from '@infrastructure/persistency/orm/sequelize/adapters/CustomerAdapter';

@Module({
  controllers: [CustomerController],
  providers: [CustomerAdapter],
  imports: [SequelizeModule.forFeature([Customer])],
})
export class CustomersModule {}
