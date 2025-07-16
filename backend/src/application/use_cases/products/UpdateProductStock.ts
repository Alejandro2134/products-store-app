import { ProductDTO } from '@application/dto/Product';
import { BadRequestError } from '@application/errors/BadRequestError';
import { MapperDTO } from '@application/mappers/Mapper';
import { UpdateProductStockPort } from '@application/ports/in/ProductPorts';
import { Product } from '@domain/entities/Product';
import { ProductPort } from '@domain/ports/out/ProductPort';

export class UpdateProductStock
  implements UpdateProductStockPort, MapperDTO<Product, ProductDTO>
{
  constructor(private readonly productAdapter: ProductPort) {}

  async execute(
    item: ProductDTO,
    quantity: number,
    t?: unknown,
  ): Promise<void> {
    const product = this.fromDTOToDomain(item);
    const res = product.reduceStock(quantity);

    if (!res.success) throw new BadRequestError(res.reason);

    await this.productAdapter.updateById(
      product.getId(),
      {
        stock: product.getStock(),
      },
      t,
    );
  }

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
}
