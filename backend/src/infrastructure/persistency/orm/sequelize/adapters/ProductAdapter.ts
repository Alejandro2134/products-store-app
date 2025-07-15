import { Product } from '@domain/entities/Product';
import { ProductPort } from '@domain/ports/out/ProductPort';
import { Product as ProductModel } from '@infrastructure/persistency/orm/sequelize/models/Product';
import { InjectModel } from '@nestjs/sequelize';
import { MapperModel } from '@infrastructure/persistency/orm/sequelize/mappers/Mapper';

export class ProductAdapter
  implements ProductPort, MapperModel<Product, ProductModel>
{
  constructor(
    @InjectModel(ProductModel)
    private productModel: typeof ProductModel,
  ) {}

  async findAll(): Promise<Product[]> {
    const products = await this.productModel.findAll();
    return products.map(this.fromModelToDomain);
  }

  fromModelToDomain(this: void, model: ProductModel): Product {
    return new Product({
      id: model.id,
      description: model.description,
      name: model.name,
      price: model.price,
      stock: model.stock,
    });
  }
}
