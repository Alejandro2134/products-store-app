import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from '@infrastructure/web/frameworks/nest/app.controller';
import { AppService } from '@infrastructure/web/frameworks/nest/app.service';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: '',
      port: 5432,
      username: '',
      password: '',
      database: '',
      models: [],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
