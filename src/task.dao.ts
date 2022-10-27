import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Scheduler } from './entity/scheduler.entity';
import * as moment from 'moment';

@Injectable()
export class TaskDao {
  constructor(
    @InjectRepository(Scheduler)
    private readonly schedulerRepository: Repository<Scheduler>,
  ) {}

  async findCompletedSchedules(): Promise<Scheduler[]> {
    const currentDay = moment().toDate().getDate() - 1;
    const currentMonth = moment().toDate().getMonth() + 1;
    const currentFullYear = moment().toDate().getFullYear();

    return this.schedulerRepository
      .createQueryBuilder('scheduler')
      .innerJoinAndSelect('scheduler.user', 'user')
      .andWhere(
        `scheduler.finishedAt >= '${currentFullYear}-${currentMonth}-${currentDay} 00:00:00'`,
      )
      .andWhere(
        `scheduler.finishedAt <= '${currentFullYear}-${currentMonth}-${currentDay} 23:59:59'`,
      )
      .getMany();
  }
}
