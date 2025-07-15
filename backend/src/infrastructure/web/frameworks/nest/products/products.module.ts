import { Module } from '@nestjs/common';
import { ProductsController } from '@infrastructure/web/frameworks/nest/products/products.controller';
import { ProductAdapter } from '@infrastructure/persistency/orm/sequelize/adapters/ProductAdapter';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from '@infrastructure/persistency/orm/sequelize/models/Product';

@Module({
  controllers: [ProductsController],
  providers: [ProductAdapter],
  imports: [SequelizeModule.forFeature([Product])],
})
export class ProductsModule {}
