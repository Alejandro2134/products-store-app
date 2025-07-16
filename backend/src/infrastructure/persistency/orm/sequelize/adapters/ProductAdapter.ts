import { IProductUpdate, Product } from '@domain/entities/Product';
import { ProductPort } from '@domain/ports/out/ProductPort';
import { Product as ProductModel } from '@infrastructure/persistency/orm/sequelize/models/Product';
import { InjectModel } from '@nestjs/sequelize';
import {
  MapperModel,
  MapperPartialDomain,
} from '@infrastructure/persistency/orm/sequelize/mappers/Mapper';
import { CreationAttributes, FindOptions, Transaction } from 'sequelize';
import { DatabaseError } from '@application/errors/DatabaseError';

export class ProductAdapter
  implements
    ProductPort,
    MapperModel<Product, ProductModel>,
    MapperPartialDomain<IProductUpdate, CreationAttributes<ProductModel>>
{
  constructor(
    @InjectModel(ProductModel)
    private productModel: typeof ProductModel,
  ) {}

  async updateById(
    id: number,
    item: IProductUpdate,
    t?: Transaction,
  ): Promise<void> {
    try {
      const mappedUpdates = this.fromPartialDomainToModel(item);

      await this.productModel.update(mappedUpdates, {
        transaction: t,
        where: {
          id,
        },
      });
    } catch (error) {
      console.error(error);
      throw new DatabaseError();
    }
  }

  async findById(
    id: number,
    t?: Transaction,
    lock: boolean = false,
  ): Promise<Product | null> {
    try {
      const options: Omit<FindOptions<any>, 'where'> = {};

      if (t) {
        options.transaction = t;
        if (lock) options.lock = t.LOCK.UPDATE;
      }

      const product = await this.productModel.findByPk(id, options);
      if (product) return this.fromModelToDomain(product);
      else return product;
    } catch (error) {
      console.error(error);
      throw new DatabaseError();
    }
  }

  async findAll(): Promise<Product[]> {
    try {
      const products = await this.productModel.findAll();
      return products.map(this.fromModelToDomain);
    } catch (error) {
      console.error(error);
      throw new DatabaseError();
    }
  }

  fromModelToDomain(this: void, model: ProductModel): Product {
    return new Product({
      id: model.id,
      description: model.description,
      name: model.name,
      priceInCents: model.price_in_cents,
      stock: model.stock,
      currency: model.currency,
    });
  }

  fromPartialDomainToModel(
    domain: IProductUpdate,
  ): CreationAttributes<ProductModel> {
    const model: { [attribute: string]: string | number } = {};

    for (const [key, value] of Object.entries(domain)) {
      const snakeKey = this.camelToSnake(key);
      model[snakeKey] = value as string | number;
    }

    return model;
  }

  private camelToSnake(str: string): string {
    return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
  }
}
