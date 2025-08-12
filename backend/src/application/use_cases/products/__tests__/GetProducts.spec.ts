import { ProductPort } from '@domain/ports/out/ProductPort';
import { GetProducts } from '../GetProducts';
import { Product } from '@domain/entities/Product';

describe('Get products use case', () => {
  it('should return a list of products', async () => {
    //Arrange
    const products: Product[] = [
      new Product({
        currency: 'COP',
        description: 'A Guitar with 8 strings :o',
        name: 'Guitar',
        priceInCents: 1000,
        stock: 10,
        id: 1,
      }),
    ];

    const productAdapter: ProductPort = {
      findAll: jest.fn().mockReturnValue(products),
      findById: jest.fn(),
      updateById: jest.fn(),
    };

    const useCase = new GetProducts(productAdapter);

    //Act
    const res = await useCase.execute();

    //Assert
    expect(products).toBe(res);
    expect(productAdapter.findAll).toHaveBeenCalled();
  });
});
