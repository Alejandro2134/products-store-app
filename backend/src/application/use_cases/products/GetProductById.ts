import { ProductDTO } from '@application/dto/Product';
import { NotFoundError } from '@application/errors/NotFundError';
import { ProductMapper } from '@application/mappers/ProductMapper';
import { GetProductByIdPort } from '@application/ports/in/ProductPorts';
import { ProductPort } from '@domain/ports/out/ProductPort';

export class GetProductById implements GetProductByIdPort {
  private productMapper = new ProductMapper();

  constructor(private readonly productAdapter: ProductPort) {}

  async execute(id: number, t?: unknown, lock = false): Promise<ProductDTO> {
    const product = await this.productAdapter.findById(id, t, lock);
    if (!product) throw new NotFoundError(`Product with id ${id} not found`);

    return this.productMapper.fromDomainToDTO(product);
  }
}
