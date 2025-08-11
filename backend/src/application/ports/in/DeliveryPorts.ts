import { Delivery } from '@domain/entities/Delivery';

export interface GetDeliveriesPort {
  execute(): Promise<Delivery[]>;
}

export interface CreateDeliveryPort {
  execute(item: Delivery, t?: unknown): Promise<Delivery>;
}
