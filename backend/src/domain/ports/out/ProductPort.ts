import { IProductUpdate, Product } from '@domain/entities/Product';

export interface ProductPort {
  findAll(this: void): Promise<Product[]>;
  findById(
    this: void,
    id: number,
    t?: unknown,
    lock?: boolean,
  ): Promise<Product | null>;
  updateById(
    this: void,
    id: number,
    item: IProductUpdate,
    t?: unknown,
  ): Promise<void>;
}
