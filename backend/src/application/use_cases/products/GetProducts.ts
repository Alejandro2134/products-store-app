import { ProductMapper } from '@application/mappers/ProductMapper';
import { GetProductsPort } from '@application/ports/in/ProductPorts';
import { ProductPort } from '@domain/ports/out/ProductPort';

export class GetProducts implements GetProductsPort {
  private productMapper = new ProductMapper();

  constructor(private readonly productAdapter: ProductPort) {}

  async execute() {
    const products = await this.productAdapter.findAll();
    return products.map(this.productMapper.fromDomainToDTO);
  }
}
