import { ProductDTO } from '@application/dto/Product';

export interface GetProductsPort {
  execute(): Promise<ProductDTO[]>;
}
