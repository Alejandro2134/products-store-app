import {
  BelongsTo,
  Column,
  CreatedAt,
  ForeignKey,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { Customer } from '@infrastructure/persistency/orm/sequelize/models/Customer';
import { Product } from '@infrastructure/persistency/orm/sequelize/models/Product';
import { Transaction } from '@infrastructure/persistency/orm/sequelize/models/Transaction';

@Table({ tableName: 'deliveries' })
export class Delivery extends Model {
  @Column({ primaryKey: true, autoIncrement: true, allowNull: false })
  declare id: number;

  @ForeignKey(() => Customer)
  @Column({ allowNull: false })
  declare customer_id: number;

  @ForeignKey(() => Product)
  @Column({ allowNull: false })
  declare product_id: number;

  @ForeignKey(() => Transaction)
  @Column({ allowNull: false })
  declare transaction_id: number;

  @BelongsTo(() => Customer)
  declare customer: Customer;

  @BelongsTo(() => Product)
  declare product: Product;

  @BelongsTo(() => Transaction)
  declare transaction: Transaction;

  @CreatedAt
  declare created_at: Date;

  @UpdatedAt
  declare updated_at: Date;
}
