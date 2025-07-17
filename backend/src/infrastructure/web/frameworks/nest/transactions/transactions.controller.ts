import { CreateTransactionDTO } from '@application/dto/Transaction';
import {
  CreateTransactionsPort,
  GetTransactionByIdPort,
} from '@application/ports/in/TransactionPorts';
import { CreateTransaction } from '@application/use_cases/transactions/CreateTransaction';
import { GetTransactionById } from '@application/use_cases/transactions/GetTransactionById';
import { PaymentGatewayAdapter } from '@infrastructure/integrations/payments/adapters/PaymentGatewayAdapter';
import { CustomerAdapter } from '@infrastructure/persistency/orm/sequelize/adapters/CustomerAdapter';
import { DBTransactionAdapter } from '@infrastructure/persistency/orm/sequelize/adapters/DBTransactionAdapter';
import { ProductAdapter } from '@infrastructure/persistency/orm/sequelize/adapters/ProductAdapter';
import { TransactionAdapter } from '@infrastructure/persistency/orm/sequelize/adapters/TransactionsAdapter';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('transactions')
@Controller('transactions')
export class TransactionsController {
  private readonly createTransaction: CreateTransactionsPort;
  private readonly getTransactionById: GetTransactionByIdPort;

  constructor(
    transactionAdapter: TransactionAdapter,
    paymentGatewayAdapter: PaymentGatewayAdapter,
    productAdapter: ProductAdapter,
    customerAdapter: CustomerAdapter,
    dbTransactionAdapter: DBTransactionAdapter,
  ) {
    this.createTransaction = new CreateTransaction(
      transactionAdapter,
      paymentGatewayAdapter,
      productAdapter,
      customerAdapter,
      dbTransactionAdapter,
    );
    this.getTransactionById = new GetTransactionById(transactionAdapter);
  }

  @Post()
  async create(@Body() transaction: CreateTransactionDTO) {
    return await this.createTransaction.execute(transaction);
  }

  @Get(':id')
  async getById(@Param('id') id: number) {
    return await this.getTransactionById.execute(id);
  }
}
