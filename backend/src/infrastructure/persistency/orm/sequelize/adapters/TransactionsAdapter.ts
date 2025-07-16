import { Transaction } from '@domain/entities/Transaction';
import { TransactionPort } from '@domain/ports/out/TransactionPort';
import { MapperDomain, MapperModel } from '../mappers/Mapper';
import { Transaction as TransactionModel } from '@infrastructure/persistency/orm/sequelize/models/Transaction';
import { CreationAttributes } from 'sequelize';
import { InjectModel } from '@nestjs/sequelize';
import { Customer } from '../models/Customer';
import { Product } from '../models/Product';
import { Transaction as DBTransaction } from 'sequelize';
import { DatabaseError } from '@application/errors/DatabaseError';

export class TransactionAdapter
  implements
    TransactionPort,
    MapperModel<Transaction, TransactionModel>,
    MapperDomain<Transaction, CreationAttributes<TransactionModel>>
{
  constructor(
    @InjectModel(TransactionModel)
    private transactionModel: typeof TransactionModel,
  ) {}

  async create(item: Transaction, t?: DBTransaction): Promise<Transaction> {
    try {
      const transaction = this.fromDomainToModel(item);
      const createdTransaction = await this.transactionModel.create(
        transaction,
        {
          transaction: t,
        },
      );

      await createdTransaction.reload({
        include: [Customer, Product],
      });

      return this.fromModelToDomain(createdTransaction);
    } catch (error) {
      console.error(error);
      throw new DatabaseError();
    }
  }

  fromDomainToModel(domain: Transaction): CreationAttributes<TransactionModel> {
    return {
      customer_id: domain.getCustomerId(),
      product_id: domain.getProductId(),
      status: domain.getStatus(),
      payment_gateway_transaction_id: domain.getPaymentGatewayTransactionId(),
      amount_in_cents: domain.getAmountInCents(),
      product_amount: domain.getProductAmount(),
      reference: domain.getReference(),
    };
  }

  fromModelToDomain(model: TransactionModel): Transaction {
    return new Transaction({
      customer: {
        address: {
          addressLine1: model.customer.address_line_1,
          city: model.customer.city,
          country: model.customer.country,
          phoneNumber: model.customer.phone_number,
          region: model.customer.region,
        },
        email: model.customer.email,
        fullName: model.customer.full_name,
        id: model.customer.id,
      },
      customerId: model.customer_id,
      id: model.id,
      product: {
        description: model.product.description,
        id: model.product.id,
        name: model.product.name,
        priceInCents: model.product.price_in_cents,
        stock: model.product.stock,
        currency: model.product.currency,
      },
      productId: model.product_id,
      status: model.status,
      paymentGatewayTransactionId: model.payment_gateway_transaction_id,
      amountInCents: model.amount_in_cents,
      productAmount: model.product_amount,
      reference: model.reference,
    });
  }
}
