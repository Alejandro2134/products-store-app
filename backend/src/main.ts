import { NestFactory } from '@nestjs/core';
import { AppModule } from './infrastructure/web/frameworks/nest/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Products Store')
    .setDescription('The products store API description')
    .setVersion('1.0')
    .addTag('products')
    .addTag('customers')
    .addTag('transactions')
    .addTag('deliveries')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
