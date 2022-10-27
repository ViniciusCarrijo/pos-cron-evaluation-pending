import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksService } from './task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Scheduler } from './entity/scheduler.entity';
import { TaskDao } from './task.dao';
import { RabbitModule } from './rabbitmq/rabbitmq.module';
import { SchedulerAdapter } from './adapter/schedulerAdapter';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgres://postgres:postgres@localhost:5431/bora_jogar',
      host: 'localhost',
      port: 5431,
      username: 'postgres',
      password: 'postgres',
      database: 'bora_jogar',
      ssl: false,
      entities: [__dirname + '/**/*.entity.js'],
      migrations: [],
      logging: true,
    }),
    TypeOrmModule.forFeature([User, Scheduler]),
    ScheduleModule.forRoot(),
    RabbitModule,
  ],
  controllers: [],
  providers: [TasksService, TaskDao,SchedulerAdapter],
})
export class AppModule {}
