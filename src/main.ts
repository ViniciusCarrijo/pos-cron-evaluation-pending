import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  // const app = await NestFactory.createMicroservice(AppModule, {
  //   transport: Transport.RMQ,
  //   options: {
  //     urls: ['amqp://guest:guest@192.168.18.9:5672'],
  //     queue: 'notificationEvaluationQueue',
  //     queueOptions: {
  //       durable: true,
  //     },
  //   },
  // });
  // await app.listen();
}
bootstrap();
