import { ICustomer } from '@domain/entities/Customer';
import { IProduct } from '@domain/entities/Product';

interface ITransaction {
  id?: number;
  customerId: number;
  productId: number;
  status: string;
  paymentGatewayTransactionId: string;
  amountInCents: number;
  productAmount: number;
  reference: string;
  customer?: ICustomer;
  product?: IProduct;
}

export class Transaction {
  private id?: number;
  private customerId: number;
  private productId: number;
  private status: string;
  private paymentGatewayTransactionId: string;
  private amountInCents: number;
  private productAmount: number;
  private reference: string;
  private customer?: ICustomer;
  private product?: IProduct;

  constructor(item: ITransaction) {
    this.id = item.id;
    this.customerId = item.customerId;
    this.productId = item.productId;
    this.status = item.status;
    this.customer = item.customer;
    this.product = item.product;
    this.paymentGatewayTransactionId = item.paymentGatewayTransactionId;
    this.amountInCents = item.amountInCents;
    this.productAmount = item.productAmount;
    this.reference = item.reference;
  }

  getCustomerId() {
    return this.customerId;
  }

  getProductId() {
    return this.productId;
  }

  getStatus() {
    return this.status;
  }

  getCustomer() {
    return this.customer;
  }

  getProduct() {
    return this.product;
  }

  getPaymentGatewayTransactionId() {
    return this.paymentGatewayTransactionId;
  }

  getAmountInCents() {
    return this.amountInCents;
  }

  getProductAmount() {
    return this.productAmount;
  }

  getReference() {
    return this.reference;
  }

  getId() {
    return this.id;
  }

  setPaymentGatewayTransactionId(id: string) {
    this.paymentGatewayTransactionId = id;
  }

  setReference(reference: string) {
    this.reference = reference;
  }

  setAmountInCents(amount: number) {
    this.amountInCents = amount;
  }
}
