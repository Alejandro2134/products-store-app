import { DeliveryDTO } from '@application/dto/Delivery';
import { DeliveryMapper } from '@application/mappers/DeliveryMapper';
import { GetDeliveriesPort } from '@application/ports/in/DeliveryPorts';
import { DeliveryPort } from '@domain/ports/out/DeliveryPort';

export class GetDeliveries implements GetDeliveriesPort {
  private deliveryMapper = new DeliveryMapper();

  constructor(private readonly deliveryAdapter: DeliveryPort) {}

  async execute(): Promise<DeliveryDTO[]> {
    const deliveries = await this.deliveryAdapter.findAll();
    return deliveries.map(this.deliveryMapper.fromDomainToDTO);
  }
}
