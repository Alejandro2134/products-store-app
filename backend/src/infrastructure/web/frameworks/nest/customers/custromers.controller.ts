import { CustomerDTO, ICustomerFilter } from '@application/dto/Customer';
import {
  CreateCustomerPort,
  GetCustomersPort,
} from '@application/ports/in/CustomerPorts';
import { CreateCustomer } from '@application/use_cases/customers/CreateCustomer';
import { GetCustomers } from '@application/use_cases/customers/GetCustomers';
import { CustomerAdapter } from '@infrastructure/persistency/orm/sequelize/adapters/CustomerAdapter';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('customers')
@Controller('customers')
export class CustomerController {
  private readonly createCustomer: CreateCustomerPort;
  private readonly getCustomers: GetCustomersPort;

  constructor(customerAdapter: CustomerAdapter) {
    this.createCustomer = new CreateCustomer(customerAdapter);
    this.getCustomers = new GetCustomers(customerAdapter);
  }

  @Post()
  async create(@Body() customer: CustomerDTO) {
    return await this.createCustomer.execute(customer);
  }

  @Get()
  @ApiQuery({
    name: 'email',
    required: false,
    type: String,
    description: 'Filter by customer email',
  })
  async findAll(@Query() query: ICustomerFilter) {
    return await this.getCustomers.execute(query);
  }
}
