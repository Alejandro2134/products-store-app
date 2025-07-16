import {
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  HasOne,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { Customer } from '@infrastructure/persistency/orm/sequelize/models/Customer';
import { Product } from '@infrastructure/persistency/orm/sequelize/models/Product';
import { Delivery } from '@infrastructure/persistency/orm/sequelize/models/Delivery';

@Table({ tableName: 'transactions' })
export class Transaction extends Model {
  @Column({ primaryKey: true, autoIncrement: true, allowNull: false })
  declare id: number;

  @ForeignKey(() => Customer)
  @Column({ allowNull: false })
  declare customer_id: number;

  @ForeignKey(() => Product)
  @Column({ allowNull: false })
  declare product_id: number;

  @Column({ allowNull: false })
  declare status: string;

  @Column({ allowNull: false })
  declare payment_gateway_transaction_id: string;

  @Column({ allowNull: false, type: DataType.BIGINT })
  declare amount_in_cents: number;

  @Column({ allowNull: false })
  declare product_amount: number;

  @Column({ allowNull: false, defaultValue: 'COP' })
  declare currency: string;

  @Column({ allowNull: false })
  declare reference: string;

  @BelongsTo(() => Customer)
  declare customer: Customer;

  @BelongsTo(() => Product)
  declare product: Product;

  @CreatedAt
  declare created_at: Date;

  @UpdatedAt
  declare updated_at: Date;

  @HasOne(() => Delivery)
  declare delivery: Delivery;
}
