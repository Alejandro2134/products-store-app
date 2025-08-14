import { Delivery } from '@domain/entities/Delivery';
import { DeliveryPort } from '@domain/ports/out/DeliveryPort';
import { GetDeliveries } from '../GetDeliveries';

describe('Get deliveries use case', () => {
  it('should return a list of deliveries', async () => {
    //Arrange
    const deliveries: Delivery[] = [
      new Delivery({
        customerId: 1,
        productId: 1,
        transactionId: 1,
      }),
    ];

    const deliveryAdapter: DeliveryPort = {
      create: jest.fn(),
      findAll: jest.fn().mockReturnValue(deliveries),
    };

    const useCase = new GetDeliveries(deliveryAdapter);

    //Act
    const res = await useCase.execute();

    //Assert
    expect(res).toBe(deliveries);
    expect(deliveryAdapter.findAll).toHaveBeenCalled();
  });
});
