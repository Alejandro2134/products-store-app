import {
  CreateTransactionDTO,
  TransactionDTO,
} from '@application/dto/Transaction';
import { MapperDomain, MapperDTO } from '@application/mappers/Mapper';
import {
  GetProductByIdPort,
  UpdateProductStockPort,
} from '@application/ports/in/ProductPorts';
import { CreateTransactionsPort } from '@application/ports/in/TransactionPorts';
import { Transaction } from '@domain/entities/Transaction';
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

export class CreateTransaction
  implements
    CreateTransactionsPort,
    MapperDTO<Transaction, CreateTransactionDTO>,
    MapperDomain<Transaction, TransactionDTO>
{
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
        const entity = this.fromDTOToDomain(item);

        const product = await this.getProductById.execute(
          entity.getProductId(),
          t,
          true,
        );

        const customer = await this.getCustomerById.execute(
          entity.getCustomerId(),
          t,
        );

        entity.setAmountInCents(item.product_amount * product.price_in_cents);

        const payment = await this.createPayment.execute(
          customer,
          item.payment_method_token,
          entity.getAmountInCents(),
        );

        entity.setReference(payment.getReference()!);
        entity.setPaymentGatewayTransactionId(payment.getId()!);

        await this.updateProductStock.execute(product, item.product_amount, t);
        const createdTransaction = await this.transactionAdapter.create(
          entity,
          t,
        );
        return this.fromDomainToDTO(createdTransaction);
      },
    );
  }

  fromDomainToDTO(domain: Transaction): TransactionDTO {
    const customerInfo = domain.getCustomer()!;
    const productInfo = domain.getProduct()!;

    return new TransactionDTO({
      customer: {
        address: {
          address_line_1: customerInfo.address.addressLine1,
          city: customerInfo.address.city,
          country: customerInfo.address.country,
          phone_number: customerInfo.address.phoneNumber,
          region: customerInfo.address.region,
        },
        email: customerInfo.email,
        full_name: customerInfo.fullName,
      },
      product: {
        description: productInfo.description,
        name: productInfo.name,
        price_in_cents: productInfo.priceInCents,
        stock: productInfo.stock,
        currency: productInfo.currency,
      },
      status: domain.getStatus(),
      payment_gateway_transaction_id: domain.getPaymentGatewayTransactionId(),
      reference: domain.getReference(),
      id: domain.getId() || 0,
    });
  }

  fromDTOToDomain(dto: CreateTransactionDTO): Transaction {
    return new Transaction({
      customerId: dto.customer_id,
      productId: dto.product_id,
      status: 'PENDING',
      amountInCents: 0,
      paymentGatewayTransactionId: '',
      productAmount: dto.product_amount,
      reference: '',
    });
  }
}
