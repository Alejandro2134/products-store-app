import {
  Column,
  CreatedAt,
  DataType,
  HasMany,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { Transaction } from '@infrastructure/persistency/orm/sequelize/models/Transaction';
import { Delivery } from '@infrastructure/persistency/orm/sequelize/models/Delivery';

@Table({ tableName: 'products' })
export class Product extends Model {
  @Column({ primaryKey: true, autoIncrement: true, allowNull: false })
  declare id: number;

  @Column({ allowNull: false })
  declare name: string;

  @Column({ allowNull: false, type: DataType.BIGINT })
  declare price_in_cents: number;

  @Column({ allowNull: false })
  declare stock: number;

  @Column({ allowNull: true, type: DataType.TEXT })
  declare description: string;

  @Column({ allowNull: false, defaultValue: 'COP' })
  declare currency: string;

  @CreatedAt
  declare created_at: Date;

  @UpdatedAt
  declare updated_at: Date;

  @HasMany(() => Transaction)
  declare transactions: Transaction[];

  @HasMany(() => Delivery)
  declare deliveries: Delivery[];
}
