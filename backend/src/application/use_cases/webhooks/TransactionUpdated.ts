import { TransactionUpdatedDTO } from '@application/dto/Webhooks';
import { SecurityUtilPorts } from '@application/ports/in/SecurityUtilPorts';
import {
  TransactionUpdatedPort,
  VerifyIfSignatureIsValidPort,
} from '@application/ports/in/WebhookPorts';
import { TransactionStatus, WebhookEvent } from '@application/dto/Webhooks';
import { TransactionPort } from '@domain/ports/out/TransactionPort';
import { GetTransactionByReference } from '../transactions/GetTransactionByReference';
import {
  GetTransactionByReferencePort,
  UpdateTransactionStatusPort,
} from '@application/ports/in/TransactionPorts';
import { VerifyIfSignatureIsValid } from './VerifyIfSignatureIsValid';
import { UpdateProductStockPort } from '@application/ports/in/ProductPorts';
import { UpdateProductStock } from '../products/UpdateProductStock';
import { ProductPort } from '@domain/ports/out/ProductPort';
import { DBTransactionPort } from '@domain/ports/out/DBTransactionPort';
import { UpdateTransactionStatus } from '../transactions/UpdateTransactionStatus';
import { CreateDeliveryPort } from '@application/ports/in/DeliveryPorts';
import { CreateDelivery } from '../deliveries/CreateDelivery';
import { DeliveryPort } from '@domain/ports/out/DeliveryPort';
import { CustomerPort } from '@domain/ports/out/CustomerPort';

export class TransactionUpdated implements TransactionUpdatedPort {
  private readonly getTransactionByReference: GetTransactionByReferencePort;
  private readonly verifyIfSignatureIsValid: VerifyIfSignatureIsValidPort;
  private readonly updateProductStock: UpdateProductStockPort;
  private readonly updateTransactionStatus: UpdateTransactionStatusPort;
  private readonly createDelivery: CreateDeliveryPort;

  constructor(
    private readonly securityUtils: SecurityUtilPorts,
    private readonly transactionAdapter: TransactionPort,
    private readonly productAdapter: ProductPort,
    private readonly dbTransactionsAdapter: DBTransactionPort,
    private readonly deliveryAdapter: DeliveryPort,
    private readonly customerAdapter: CustomerPort,
  ) {
    this.getTransactionByReference = new GetTransactionByReference(
      this.transactionAdapter,
    );
    this.verifyIfSignatureIsValid = new VerifyIfSignatureIsValid(
      this.securityUtils,
    );
    this.updateProductStock = new UpdateProductStock(this.productAdapter);
    this.updateTransactionStatus = new UpdateTransactionStatus(
      this.transactionAdapter,
    );
    this.createDelivery = new CreateDelivery(
      deliveryAdapter,
      transactionAdapter,
      productAdapter,
      customerAdapter,
    );
  }

  async execute(item: TransactionUpdatedDTO): Promise<void> {
    await this.dbTransactionsAdapter.createTransaction<void>(async (t) => {
      if (item.event === WebhookEvent.TRANSACTION_UPDATED) {
        if (this.verifyIfSignatureIsValid.isSignatureValid(item)) {
          const transaction = await this.getTransactionByReference.execute(
            item.transaction.reference,
            t,
          );

          if (item.transaction.status === TransactionStatus.APPROVED) {
            await this.updateTransactionStatus.execute(
              transaction,
              'APPROVED',
              t,
            );

            await this.createDelivery.execute(
              {
                customerId: transaction.customer.id!,
                productId: transaction.product.id!,
                transactionId: transaction.id,
              },
              t,
            );
          } else {
            await this.updateTransactionStatus.execute(
              transaction,
              'REJECTED',
              t,
            );

            await this.updateProductStock.execute(
              transaction.product,
              transaction.product_amount,
              false,
              t,
            );
          }
        }
      }
    });
  }
}
