import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      enableDebugMessages: true,
    }),
  );
  await app.listen(3331);
  const kafkaConsumer =
    await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['localhost:29092'],
        },
        consumer: {
          groupId: 'courses-consumer',
        },
      },
    });
  kafkaConsumer.listen();
}
bootstrap();
