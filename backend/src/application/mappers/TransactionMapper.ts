import { Transaction } from '@domain/entities/Transaction';
import { MapperDomain, MapperDTO, MapperDTOCreate } from './Mapper';
import {
  CreateTransactionDTO,
  TransactionDTO,
} from '@application/dto/Transaction';

export class TransactionMapper
  implements
    MapperDTO<Transaction, TransactionDTO>,
    MapperDomain<Transaction, TransactionDTO>,
    MapperDTOCreate<Transaction, CreateTransactionDTO>
{
  fromDTOCreateToDomain(dto: CreateTransactionDTO): Transaction {
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

  fromDTOToDomain(dto: TransactionDTO): Transaction {
    return new Transaction({
      customerId: dto.customer.id!,
      productId: dto.product.id!,
      status: dto.status,
      amountInCents: dto.product_amount * dto.product.price_in_cents,
      paymentGatewayTransactionId: dto.payment_gateway_transaction_id,
      productAmount: dto.product_amount,
      reference: dto.reference,
      customer: {
        email: dto.customer.email,
        fullName: dto.customer.full_name,
        address: {
          addressLine1: dto.customer.address.address_line_1,
          city: dto.customer.address.city,
          country: dto.customer.address.country,
          phoneNumber: dto.customer.address.phone_number,
          region: dto.customer.address.region,
        },
        id: dto.customer.id!,
      },
      id: dto.id,
      product: {
        currency: dto.product.currency,
        description: dto.product.description,
        name: dto.product.name,
        priceInCents: dto.product.price_in_cents,
        stock: dto.product.stock,
        id: dto.product.id!,
      },
    });
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
      product_amount: domain.getProductAmount(),
    });
  }
}
