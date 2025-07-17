import { TransactionDTO } from '@application/dto/Transaction';
import { NotFoundError } from '@application/errors/NotFundError';
import { MapperDomain } from '@application/mappers/Mapper';
import { GetTransactionByIdPort } from '@application/ports/in/TransactionPorts';
import { Transaction } from '@domain/entities/Transaction';
import { TransactionPort } from '@domain/ports/out/TransactionPort';

export class GetTransactionById
  implements MapperDomain<Transaction, TransactionDTO>, GetTransactionByIdPort
{
  constructor(private readonly transactionAdapter: TransactionPort) {}

  async execute(id: number): Promise<TransactionDTO> {
    const transaction = await this.transactionAdapter.findById(id);
    if (!transaction)
      throw new NotFoundError(`Transaction with id ${id} not found`);

    return this.fromDomainToDTO(transaction);
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
}
