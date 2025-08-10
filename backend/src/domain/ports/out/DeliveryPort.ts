import { Delivery } from '@domain/entities/Delivery';

export interface DeliveryPort {
  create(item: Delivery, t?: unknown): Promise<Delivery>;
  findAll(): Promise<Delivery[]>;
}
