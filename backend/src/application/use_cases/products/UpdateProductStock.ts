import { ProductDTO } from '@application/dto/Product';
import { BadRequestError } from '@application/errors/BadRequestError';
import { ProductMapper } from '@application/mappers/ProductMapper';
import { UpdateProductStockPort } from '@application/ports/in/ProductPorts';
import { ProductPort } from '@domain/ports/out/ProductPort';

export class UpdateProductStock implements UpdateProductStockPort {
  private productMapper = new ProductMapper();

  constructor(private readonly productAdapter: ProductPort) {}

  async execute(
    item: ProductDTO,
    quantity: number,
    reduceStock: boolean,
    t?: unknown,
  ): Promise<void> {
    const product = this.productMapper.fromDTOToDomain(item);

    if (reduceStock) {
      const res = product.reduceStock(quantity);
      if (!res.success) throw new BadRequestError(res.reason);
    } else {
      const res = product.addStock(quantity);
      if (!res.success) throw new BadRequestError(res.reason);
    }

    await this.productAdapter.updateById(
      product.getId(),
      {
        stock: product.getStock(),
      },
      t,
    );
  }
}
