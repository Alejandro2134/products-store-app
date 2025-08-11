import { BadRequestError } from '@application/errors/BadRequestError';
import { UpdateProductStockPort } from '@application/ports/in/ProductPorts';
import { Product } from '@domain/entities/Product';
import { ProductPort } from '@domain/ports/out/ProductPort';

export class UpdateProductStock implements UpdateProductStockPort {
  constructor(private readonly productAdapter: ProductPort) {}

  async execute(
    item: Product,
    id: number,
    quantity: number,
    reduceStock: boolean,
    t?: unknown,
  ): Promise<void> {
    if (reduceStock) {
      const res = item.reduceStock(quantity);
      if (!res.success) throw new BadRequestError(res.reason);
    } else {
      const res = item.addStock(quantity);
      if (!res.success) throw new BadRequestError(res.reason);
    }

    await this.productAdapter.updateById(
      id,
      {
        stock: item.getStock(),
      },
      t,
    );
  }
}
