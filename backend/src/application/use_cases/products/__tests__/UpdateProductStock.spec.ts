import { ProductPort } from '@domain/ports/out/ProductPort';
import { UpdateProductStock } from '../UpdateProductStock';
import { Product } from '@domain/entities/Product';

describe('Update product stock use case', () => {
  it('should reduce the stock of a product successfully', async () => {
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
      findById: jest.fn(),
      updateById: jest.fn(),
    };

    const useCase = new UpdateProductStock(productAdapter);

    //Act
    await useCase.execute(product, 1, 5, true);

    //Assert
    expect(product.getStock()).toBe(5);
    expect(productAdapter.updateById).toHaveBeenCalled();
  });

  it('should add to the stock of a product successfully', async () => {
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
      findById: jest.fn(),
      updateById: jest.fn(),
    };

    const useCase = new UpdateProductStock(productAdapter);

    //Act
    await useCase.execute(product, 1, 5, false);

    //Assert
    expect(product.getStock()).toBe(15);
    expect(productAdapter.updateById).toHaveBeenCalled();
  });

  it('should throw an error if reducing the stock of a product fails', async () => {
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
      findById: jest.fn(),
      updateById: jest.fn(),
    };

    const useCase = new UpdateProductStock(productAdapter);

    //Act & Assert
    await expect(useCase.execute(product, 1, 20, true)).rejects.toThrow(
      'Insufficient stock. Available: 10',
    );
  });

  it('should throw an error if adding to the stock of a product fails', async () => {
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
      findById: jest.fn(),
      updateById: jest.fn(),
    };

    const useCase = new UpdateProductStock(productAdapter);

    //Act & Assert
    await expect(useCase.execute(product, 1, -10, false)).rejects.toThrow(
      'Quantity to add must be a positive number',
    );
  });
});
