import { GetProductsPort } from '@application/ports/in/ProductPorts';
import { GetProducts } from '@application/use_cases/products/GetProducts';
import { ProductAdapter } from '@infrastructure/persistency/orm/sequelize/adapters/ProductAdapter';
import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  private readonly getProducts: GetProductsPort;

  constructor(productAdapter: ProductAdapter) {
    this.getProducts = new GetProducts(productAdapter);
  }

  @Get()
  async findAll() {
    return await this.getProducts.execute();
  }
}
