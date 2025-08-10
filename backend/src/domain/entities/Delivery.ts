import { ICustomer } from '@domain/entities/Customer';
import { IProduct } from '@domain/entities/Product';
import { ITransaction } from '@domain/entities/Transaction';

interface IDelivery {
  id?: number;
  customerId: number;
  productId: number;
  transactionId: number;
  customer?: ICustomer;
  product?: IProduct;
  transaction?: ITransaction;
}

export class Delivery {
  private id?: number;
  private customerId: number;
  private productId: number;
  private transactionId: number;
  private customer?: ICustomer;
  private product?: IProduct;
  private transaction?: ITransaction;

  constructor(item: IDelivery) {
    this.id = item.id;
    this.customerId = item.customerId;
    this.productId = item.productId;
    this.transactionId = item.transactionId;
    this.customer = item.customer;
    this.product = item.product;
    this.transaction = item.transaction;
  }

  getCustomerId() {
    return this.customerId;
  }

  getProductId() {
    return this.productId;
  }

  getTransactionId() {
    return this.transactionId;
  }

  getCustomer() {
    return this.customer;
  }

  getId() {
    return this.id;
  }

  getProduct() {
    return this.product;
  }

  getTransaction() {
    return this.transaction;
  }
}
