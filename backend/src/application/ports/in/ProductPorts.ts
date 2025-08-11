import { Product } from '@domain/entities/Product';

export interface GetProductsPort {
  execute(): Promise<Product[]>;
}

export interface GetProductByIdPort {
  execute(id: number, t?: unknown, lock?: boolean): Promise<Product>;
}

export interface UpdateProductStockPort {
  execute(
    item: Product,
    id: number,
    quantity: number,
    reduceStock: boolean,
    t?: unknown,
  ): Promise<void>;
}
