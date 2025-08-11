import {
  GetProductByIdPort,
  UpdateProductStockPort,
} from '@application/ports/in/ProductPorts';
import { CreateTransactionsPort } from '@application/ports/in/TransactionPorts';
import { CustomerPort } from '@domain/ports/out/CustomerPort';
import { DBTransactionPort } from '@domain/ports/out/DBTransactionPort';
import { PaymentGatewayPort } from '@domain/ports/out/PaymentGatewayPort';
import { ProductPort } from '@domain/ports/out/ProductPort';
import { TransactionPort } from '@domain/ports/out/TransactionPort';
import { GetProductById } from '../products/GetProductById';
import { GetCustomerByIdPort } from '@application/ports/in/CustomerPorts';
import { GetCustomerById } from '../customers/GetCustomerById';
import { UpdateProductStock } from '../products/UpdateProductStock';
import { CreatePaymentPort } from '@application/ports/in/PaymentPorts';
import { CreatePayment } from '../payments/CreatePayment';
import { Transaction } from '@domain/entities/Transaction';

export class CreateTransaction implements CreateTransactionsPort {
  private getProductById: GetProductByIdPort;
  private getCustomerById: GetCustomerByIdPort;
  private updateProductStock: UpdateProductStockPort;
  private createPayment: CreatePaymentPort;

  constructor(
    private readonly transactionAdapter: TransactionPort,
    private readonly paymentGatewayAdapter: PaymentGatewayPort,
    private readonly productAdapter: ProductPort,
    private readonly customerAdapter: CustomerPort,
    private readonly dbTransactionsAdapter: DBTransactionPort,
  ) {
    this.getProductById = new GetProductById(this.productAdapter);
    this.getCustomerById = new GetCustomerById(this.customerAdapter);
    this.updateProductStock = new UpdateProductStock(this.productAdapter);
    this.createPayment = new CreatePayment(this.paymentGatewayAdapter);
  }

  async execute(item: Transaction): Promise<Transaction> {
    return await this.dbTransactionsAdapter.createTransaction<Transaction>(
      async (t) => {
        const product = await this.getProductById.execute(
          item.getProductId(),
          t,
          true,
        );

        const customer = await this.getCustomerById.execute(
          item.getCustomerId(),
          t,
        );

        item.setAmountInCents(
          item.getProductAmount() * product.getPriceInCents(),
        );

        const payment = await this.createPayment.execute(
          customer,
          item.getPaymentMethodToken()!,
          item.getAmountInCents(),
        );

        item.setReference(payment.getReference()!);
        item.setPaymentGatewayTransactionId(payment.getId()!);

        await this.updateProductStock.execute(
          product,
          item.getProductId(),
          item.getProductAmount(),
          true,
          t,
        );
        const createdTransaction = await this.transactionAdapter.create(
          item,
          t,
        );

        return createdTransaction;
      },
    );
  }
}
