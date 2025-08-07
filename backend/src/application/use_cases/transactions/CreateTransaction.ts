import {
  CreateTransactionDTO,
  TransactionDTO,
} from '@application/dto/Transaction';
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
import { TransactionMapper } from '@application/mappers/TransactionMapper';

export class CreateTransaction implements CreateTransactionsPort {
  private transactionMapper = new TransactionMapper();
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

  async execute(item: CreateTransactionDTO): Promise<TransactionDTO> {
    return await this.dbTransactionsAdapter.createTransaction<TransactionDTO>(
      async (t) => {
        const transaction = this.transactionMapper.fromDTOCreateToDomain(item);

        const product = await this.getProductById.execute(
          transaction.getProductId(),
          t,
          true,
        );

        const customer = await this.getCustomerById.execute(
          transaction.getCustomerId(),
          t,
        );

        transaction.setAmountInCents(
          item.product_amount * product.price_in_cents,
        );

        const payment = await this.createPayment.execute(
          customer,
          item.payment_method_token,
          transaction.getAmountInCents(),
        );

        transaction.setReference(payment.getReference()!);
        transaction.setPaymentGatewayTransactionId(payment.getId()!);

        await this.updateProductStock.execute(
          product,
          item.product_amount,
          true,
          t,
        );
        const createdTransaction = await this.transactionAdapter.create(
          transaction,
          t,
        );

        return this.transactionMapper.fromDomainToDTO(createdTransaction);
      },
    );
  }
}
