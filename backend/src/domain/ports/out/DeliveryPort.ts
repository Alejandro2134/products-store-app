import { Delivery } from '@domain/entities/Delivery';

export interface DeliveryPort {
  create(this: void, item: Delivery, t?: unknown): Promise<Delivery>;
  findAll(this: void): Promise<Delivery[]>;
}
