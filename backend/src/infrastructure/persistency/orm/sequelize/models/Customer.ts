import {
  Column,
  CreatedAt,
  HasMany,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { Transaction } from '@infrastructure/persistency/orm/sequelize/models/Transaction';
import { Delivery } from '@infrastructure/persistency/orm/sequelize/models/Delivery';

@Table({ tableName: 'customers' })
export class Customer extends Model {
  @Column({ primaryKey: true, autoIncrement: true, allowNull: false })
  declare id: number;

  @Column({ allowNull: false, unique: true })
  declare email: string;

  @Column({ allowNull: false })
  declare full_name: string;

  @Column({ allowNull: false })
  declare address_line_1: string;

  @Column({ allowNull: false })
  declare country: string;

  @Column({ allowNull: false })
  declare city: string;

  @Column({ allowNull: false })
  declare phone_number: string;

  @CreatedAt
  declare created_at: Date;

  @UpdatedAt
  declare updated_at: Date;

  @HasMany(() => Transaction)
  declare transactions: Transaction[];

  @HasMany(() => Delivery)
  declare deliveries: Delivery[];
}
