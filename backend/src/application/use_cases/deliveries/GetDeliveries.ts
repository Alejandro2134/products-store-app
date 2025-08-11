import { GetDeliveriesPort } from '@application/ports/in/DeliveryPorts';
import { Delivery } from '@domain/entities/Delivery';
import { DeliveryPort } from '@domain/ports/out/DeliveryPort';

export class GetDeliveries implements GetDeliveriesPort {
  constructor(private readonly deliveryAdapter: DeliveryPort) {}

  async execute(): Promise<Delivery[]> {
    const deliveries = await this.deliveryAdapter.findAll();
    return deliveries;
  }
}
