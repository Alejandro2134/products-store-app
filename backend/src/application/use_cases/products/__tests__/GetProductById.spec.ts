import { ProductPort } from '@domain/ports/out/ProductPort';
import { GetProductById } from '../GetProductById';
import { Product } from '@domain/entities/Product';

describe('Get product by id use case', () => {
  it('should get the product with the provided id', async () => {
    //Arrange
    const product = new Product({
      currency: 'COP',
      description: 'A Guitar with 8 strings :o',
      name: 'Guitar',
      priceInCents: 1000,
      stock: 10,
      id: 1,
    });

    const productAdapter: ProductPort = {
      findAll: jest.fn(),
      findById: jest.fn().mockReturnValue(product),
      updateById: jest.fn(),
    };

    const useCase = new GetProductById(productAdapter);

    //Act
    const res = await useCase.execute(1);

    //Assert
    expect(res).toBe(product);
    expect(productAdapter.findById).toHaveBeenCalled();
  });

  it('should throw an error if the product with the provided id dont exist', async () => {
    //Arrange
    const productAdapter: ProductPort = {
      findAll: jest.fn(),
      findById: jest.fn().mockReturnValue(null),
      updateById: jest.fn(),
    };

    const useCase = new GetProductById(productAdapter);

    //Act & Assert
    await expect(useCase.execute(30)).rejects.toThrow(
      'Product with id 30 not found',
    );
  });
});
