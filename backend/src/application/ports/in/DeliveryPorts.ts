import { CreateDeliveryDTO, DeliveryDTO } from '@application/dto/Delivery';

export interface GetDeliveriesPort {
  execute(): Promise<DeliveryDTO[]>;
}

export interface CreateDeliveryPort {
  execute(item: CreateDeliveryDTO, t?: unknown): Promise<DeliveryDTO>;
}
