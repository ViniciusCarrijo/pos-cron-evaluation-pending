import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { SchedulerAdapter } from './adapter/schedulerAdapter';
import { RabbitService } from './rabbitmq/rabbitmq.service';
import { TaskDao } from './task.dao';

@Injectable()
export class TasksService {
  constructor(
    private readonly taskDao: TaskDao,
    private readonly rabbitService: RabbitService,
    private readonly schedulerAdapter: SchedulerAdapter,
  ) {}
  private readonly logger = new Logger(TasksService.name);

  @Cron(CronExpression.EVERY_DAY_AT_1AM, {
    name: 'Evaluation pending',
    timeZone: 'America/Sao_Paulo',
  })
  async handleCron() {
    const schedules = await this.taskDao.findCompletedSchedules();
    

    schedules.map(async (schedule) => {
      await this.rabbitService.publishInExchange(
        this.schedulerAdapter.toResponseRabbitMQ(schedule)
      );

      this.logger.debug(`Scheduler with id: ${schedule.id} sended to rabbitMQ`);
    });
  }
}
