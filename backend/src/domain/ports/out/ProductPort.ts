import { Product } from '@domain/entities/Product';

export interface ProductPort {
  findAll(): Promise<Product[]>;
}
