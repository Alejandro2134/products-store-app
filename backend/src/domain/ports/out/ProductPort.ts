import { IProductUpdate, Product } from '@domain/entities/Product';

export interface ProductPort {
  findAll(): Promise<Product[]>;
  findById(id: number, t?: unknown, lock?: boolean): Promise<Product | null>;
  updateById(id: number, item: IProductUpdate, t?: unknown): Promise<void>;
}
