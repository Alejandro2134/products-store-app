import { NotFoundError } from '@application/errors/NotFundError';
import { GetProductByIdPort } from '@application/ports/in/ProductPorts';
import { Product } from '@domain/entities/Product';
import { ProductPort } from '@domain/ports/out/ProductPort';

export class GetProductById implements GetProductByIdPort {
  constructor(private readonly productAdapter: ProductPort) {}

  async execute(id: number, t?: unknown, lock = false): Promise<Product> {
    const product = await this.productAdapter.findById(id, t, lock);
    if (!product) throw new NotFoundError(`Product with id ${id} not found`);

    return product;
  }
}
