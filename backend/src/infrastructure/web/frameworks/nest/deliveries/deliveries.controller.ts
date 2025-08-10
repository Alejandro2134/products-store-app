import { GetDeliveriesPort } from '@application/ports/in/DeliveryPorts';
import { GetDeliveries } from '@application/use_cases/deliveries/GetDeliveries';
import { DeliveryAdapter } from '@infrastructure/persistency/orm/sequelize/adapters/DeliveryAdapter';
import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('deliveries')
@Controller('deliveries')
export class DeliveriesController {
  private readonly getDeliveries: GetDeliveriesPort;

  constructor(deliveryAdapter: DeliveryAdapter) {
    this.getDeliveries = new GetDeliveries(deliveryAdapter);
  }

  @Get()
  async findAll() {
    return await this.getDeliveries.execute();
  }
}
