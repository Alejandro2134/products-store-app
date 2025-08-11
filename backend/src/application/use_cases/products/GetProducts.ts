import { GetProductsPort } from '@application/ports/in/ProductPorts';
import { ProductPort } from '@domain/ports/out/ProductPort';

export class GetProducts implements GetProductsPort {
  constructor(private readonly productAdapter: ProductPort) {}

  async execute() {
    const products = await this.productAdapter.findAll();
    return products;
  }
}
