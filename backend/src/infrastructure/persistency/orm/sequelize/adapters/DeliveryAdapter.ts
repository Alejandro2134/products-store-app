import { DatabaseError } from '@application/errors/DatabaseError';
import { Delivery } from '@domain/entities/Delivery';
import { DeliveryPort } from '@domain/ports/out/DeliveryPort';
import { Delivery as DeliveryModel } from '@infrastructure/persistency/orm/sequelize/models/Delivery';
import { InjectModel } from '@nestjs/sequelize';
import { MapperDomain, MapperModel } from '../mappers/Mapper';
import { CreationAttributes } from 'sequelize';
import { Customer } from '../models/Customer';
import { Product } from '../models/Product';
import { Transaction } from '../models/Transaction';
import { Transaction as DBTransaction } from 'sequelize';

export class DeliveryAdapter
  implements
    DeliveryPort,
    MapperModel<Delivery, DeliveryModel>,
    MapperDomain<Delivery, CreationAttributes<DeliveryModel>>
{
  constructor(
    @InjectModel(DeliveryModel) private deliveryModel: typeof DeliveryModel,
  ) {}

  async create(item: Delivery, t?: DBTransaction): Promise<Delivery> {
    try {
      const delivery = this.fromDomainToModel(item);
      const createdDelivery = await this.deliveryModel.create(delivery, {
        transaction: t,
      });

      await createdDelivery.reload({
        include: [Customer, Product, Transaction],
        transaction: t,
      });

      return this.fromModelToDomain(createdDelivery);
    } catch (error) {
      console.error(error);
      throw new DatabaseError();
    }
  }

  async findAll(): Promise<Delivery[]> {
    try {
      const deliveries = await this.deliveryModel.findAll({
        order: [['id', 'ASC']],
        include: [Customer, Product, Transaction],
      });
      return deliveries.map(this.fromModelToDomain);
    } catch (error) {
      console.error(error);
      throw new DatabaseError();
    }
  }

  fromModelToDomain(this: void, model: DeliveryModel): Delivery {
    return new Delivery({
      id: model.id,
      customerId: model.customer_id,
      productId: model.product_id,
      transactionId: model.transaction_id,
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
      },
      product: {
        id: model.product.id,
        name: model.product.name,
        currency: model.product.currency,
        description: model.product.description,
        priceInCents: model.product.price_in_cents,
        stock: model.product.stock,
      },
      transaction: {
        amountInCents: model.transaction.amount_in_cents,
        customerId: model.transaction.customer_id,
        paymentGatewayTransactionId:
          model.transaction.payment_gateway_transaction_id,
        productId: model.transaction.product_id,
        status: model.transaction.status,
        reference: model.transaction.reference,
        productAmount: model.transaction.product_amount,
      },
    });
  }

  fromDomainToModel(domain: Delivery): CreationAttributes<DeliveryModel> {
    return {
      customer_id: domain.getCustomerId(),
      product_id: domain.getProductId(),
      transaction_id: domain.getTransactionId(),
    };
  }
}
