import { Delivery } from '@domain/entities/Delivery';
import { MapperDomain, MapperDTOCreate } from './Mapper';
import { CreateDeliveryDTO, DeliveryDTO } from '@application/dto/Delivery';

export class DeliveryMapper
  implements
    MapperDomain<Delivery, DeliveryDTO>,
    MapperDTOCreate<Delivery, CreateDeliveryDTO>
{
  fromDTOCreateToDomain(dto: CreateDeliveryDTO): Delivery {
    return new Delivery({
      customerId: dto.customerId,
      productId: dto.productId,
      transactionId: dto.transactionId,
    });
  }

  fromDomainToDTO(this: void, domain: Delivery): DeliveryDTO {
    const customer = domain.getCustomer()!;
    const product = domain.getProduct()!;
    const transaction = domain.getTransaction()!;

    return new DeliveryDTO({
      id: domain.getId()!,
      customer: {
        address: {
          address_line_1: customer.address.addressLine1,
          city: customer.address.city,
          country: customer.address.country,
          phone_number: customer.address.phoneNumber,
          region: customer.address.region,
        },
        email: customer.email,
        full_name: customer.fullName,
      },
      product: {
        currency: product.currency,
        description: product.description,
        name: product.name,
        price_in_cents: product.priceInCents,
        stock: product.stock,
      },
      transaction: {
        id: transaction.id!,
        payment_gateway_transaction_id: transaction.paymentGatewayTransactionId,
        product_amount: transaction.productAmount,
        reference: transaction.reference,
        status: transaction.status,
      },
    });
  }
}
