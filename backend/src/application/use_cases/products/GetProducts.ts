import { ProductDTO } from '@application/dto/Product';
import { MapperDomain } from '@application/mappers/Mapper';
import { GetProductsPort } from '@application/ports/in/ProductPorts';
import { Product } from '@domain/entities/Product';
import { ProductPort } from '@domain/ports/out/ProductPort';

export class GetProducts
  implements GetProductsPort, MapperDomain<Product, ProductDTO>
{
  constructor(private readonly productAdapter: ProductPort) {}

  async execute() {
    const products = await this.productAdapter.findAll();
    return products.map(this.fromDomainToDTO);
  }

  fromDomainToDTO(this: void, domain: Product): ProductDTO {
    return new ProductDTO({
      id: domain.getId(),
      description: domain.getDescription(),
      name: domain.getName(),
      price: domain.getPrice(),
      stock: domain.getStock(),
    });
  }
}
