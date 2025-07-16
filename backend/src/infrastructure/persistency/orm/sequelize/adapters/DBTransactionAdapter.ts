import { DBTransactionPort } from '@domain/ports/out/DBTransactionPort';
import { Injectable } from '@nestjs/common';
import { Transaction } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class DBTransactionAdapter implements DBTransactionPort {
  constructor(private sequelize: Sequelize) {}

  async createTransaction<T>(fn: (t?: Transaction) => Promise<T>): Promise<T> {
    return await this.sequelize.transaction(async (t) => {
      return await fn(t);
    });
  }
}
