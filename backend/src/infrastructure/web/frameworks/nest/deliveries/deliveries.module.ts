import { Module } from '@nestjs/common';
import { DeliveriesController } from './deliveries.controller';
import { DeliveryAdapter } from '@infrastructure/persistency/orm/sequelize/adapters/DeliveryAdapter';
import { SequelizeModule } from '@nestjs/sequelize';
import { Delivery } from '@infrastructure/persistency/orm/sequelize/models/Delivery';

@Module({
  controllers: [DeliveriesController],
  providers: [DeliveryAdapter],
  imports: [SequelizeModule.forFeature([Delivery])],
})
export class DeliveriesModule {}
