import { ICustomerDTO } from './Customer';
import { IProductDTO } from './Product';
import { ITransactionDTO } from './Transaction';

interface IDeliveryDTO {
  id: number;
  customer: ICustomerDTO;
  product: IProductDTO;
  transaction: Omit<ITransactionDTO, 'customer' | 'product'>;
}

export class CreateDeliveryDTO {
  customerId: number;
  productId: number;
  transactionId: number;
}

export class DeliveryDTO {
  id: number;
  customer: ICustomerDTO;
  product: IProductDTO;
  transaction: Omit<ITransactionDTO, 'customer' | 'product'>;

  constructor(item: IDeliveryDTO) {
    this.id = item.id;
    this.customer = item.customer;
    this.product = item.product;
    this.transaction = item.transaction;
  }
}
