import { ApiProperty } from '@nestjs/swagger';
import { ICustomerDTO } from './Customer';
import { IProductDTO } from './Product';

export class CreateTransactionDTO {
  @ApiProperty({ example: 1 })
  customer_id: number;

  @ApiProperty({ example: 42 })
  product_id: number;

  @ApiProperty({ example: 'tok_1234abc' })
  payment_method_token: string;

  @ApiProperty({ example: 3 })
  product_amount: number;
}

interface ITransactionDTO {
  id: number;
  status: string;
  product: IProductDTO;
  customer: ICustomerDTO;
  reference: string;
  payment_gateway_transaction_id: string;
  product_amount: number;
}

export class TransactionDTO {
  id: number;
  status: string;
  product: IProductDTO;
  customer: ICustomerDTO;
  reference: string;
  payment_gateway_transaction_id: string;
  product_amount: number;

  constructor(item: ITransactionDTO) {
    this.id = item.id;
    this.customer = item.customer;
    this.product = item.product;
    this.status = item.status;
    this.reference = item.reference;
    this.payment_gateway_transaction_id = item.payment_gateway_transaction_id;
    this.product_amount = item.product_amount;
  }
}
