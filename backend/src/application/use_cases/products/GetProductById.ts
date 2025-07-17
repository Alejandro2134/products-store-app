import { ProductDTO } from '@application/dto/Product';
import { NotFoundError } from '@application/errors/NotFundError';
import { MapperDomain } from '@application/mappers/Mapper';
import { GetProductByIdPort } from '@application/ports/in/ProductPorts';
import { Product } from '@domain/entities/Product';
import { ProductPort } from '@domain/ports/out/ProductPort';

export class GetProductById
  implements GetProductByIdPort, MapperDomain<Product, ProductDTO>
{
  constructor(private readonly productAdapter: ProductPort) {}

  async execute(id: number, t?: unknown, lock = false): Promise<ProductDTO> {
    const product = await this.productAdapter.findById(id, t, lock);
    if (!product) throw new NotFoundError(`Product with id ${id} not found`);

    return this.fromDomainToDTO(product);
  }

  fromDomainToDTO(domain: Product): ProductDTO {
    return new ProductDTO({
      currency: domain.getCurrency(),
      description: domain.getDescription(),
      name: domain.getName(),
      price_in_cents: domain.getPriceInCents(),
      stock: domain.getStock(),
      id: domain.getId(),
    });
  }
}
