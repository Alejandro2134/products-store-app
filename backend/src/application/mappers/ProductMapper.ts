import { Product } from '@domain/entities/Product';
import { MapperDomain, MapperDTO } from './Mapper';
import { ProductDTO } from '@application/dto/Product';

export class ProductMapper
  implements MapperDomain<Product, ProductDTO>, MapperDTO<Product, ProductDTO>
{
  fromDTOToDomain(dto: ProductDTO): Product {
    return new Product({
      currency: dto.currency,
      description: dto.description,
      name: dto.name,
      priceInCents: dto.price_in_cents,
      stock: dto.stock,
      id: dto.id || 0,
    });
  }

  fromDomainToDTO(this: void, domain: Product): ProductDTO {
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
