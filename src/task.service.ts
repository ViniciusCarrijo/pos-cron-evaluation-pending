import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { RabbitService } from './rabbitmq/rabbitmq.service';
import { TaskDao } from './task.dao';

@Injectable()
export class TasksService {
  constructor(
    private readonly taskDao: TaskDao,
    private readonly rabbitService: RabbitService,
  ) {}
  private readonly logger = new Logger(TasksService.name);

  // @Cron(CronExpression.EVERY_DAY_AT_1AM)
  @Cron(CronExpression.EVERY_10_SECONDS, {
    name: 'Evaluation pending',
    timeZone: 'America/Sao_Paulo',
  })
  async handleCron() {
    const schedules = await this.taskDao.findCompletedSchedules();
    await this.rabbitService.publishInExchange({
      Anilton: 'cria uma exchange',
    });
    this.logger.debug(schedules);
  }
}
