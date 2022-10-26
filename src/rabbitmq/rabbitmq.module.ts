import { Module } from '@nestjs/common';
import { RabbitService } from './rabbitmq.service';

@Module({
  imports: [],
  controllers: [],
  providers: [RabbitService],
  exports: [RabbitService],
})
export class RabbitModule {}
