import { ProductDTO } from '@application/dto/Product';

export interface GetProductsPort {
  execute(): Promise<ProductDTO[]>;
}

export interface GetProductByIdPort {
  execute(id: number, t?: unknown, lock?: boolean): Promise<ProductDTO>;
}

export interface UpdateProductStockPort {
  execute(
    item: ProductDTO,
    quantity: number,
    reduceStock: boolean,
    t?: unknown,
  ): Promise<void>;
}
