import { CreateDeliveryPort } from '@application/ports/in/DeliveryPorts';
import { GetProductByIdPort } from '@application/ports/in/ProductPorts';
import { GetTransactionByIdPort } from '@application/ports/in/TransactionPorts';
import { CustomerPort } from '@domain/ports/out/CustomerPort';
import { DeliveryPort } from '@domain/ports/out/DeliveryPort';
import { ProductPort } from '@domain/ports/out/ProductPort';
import { TransactionPort } from '@domain/ports/out/TransactionPort';
import { GetProductById } from '../products/GetProductById';
import { GetCustomerById } from '../customers/GetCustomerById';
import { GetCustomerByIdPort } from '@application/ports/in/CustomerPorts';
import { GetTransactionById } from '../transactions/GetTransactionById';
import { Delivery } from '@domain/entities/Delivery';

export class CreateDelivery implements CreateDeliveryPort {
  private getProductById: GetProductByIdPort;
  private getCustomerById: GetCustomerByIdPort;
  private getTransactionById: GetTransactionByIdPort;

  constructor(
    private readonly deliveryAdapter: DeliveryPort,
    private readonly transactionAdapter: TransactionPort,
    private readonly productAdapter: ProductPort,
    private readonly customerAdapter: CustomerPort,
  ) {
    this.getProductById = new GetProductById(this.productAdapter);
    this.getCustomerById = new GetCustomerById(this.customerAdapter);
    this.getTransactionById = new GetTransactionById(this.transactionAdapter);
  }

  async execute(item: Delivery, t?: unknown): Promise<Delivery> {
    await this.getProductById.execute(item.getProductId(), t);
    await this.getCustomerById.execute(item.getCustomerId(), t);
    await this.getTransactionById.execute(item.getTransactionId(), t);

    const createdDelivery = await this.deliveryAdapter.create(item, t);
    return createdDelivery;
  }
}
