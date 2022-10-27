import { Injectable } from "@nestjs/common";
import { Scheduler } from "src/entity/scheduler.entity";
import { ISchedulerResponseRabbitMQ } from "src/interface/scheduler";

@Injectable()
export class SchedulerAdapter {

  toResponseRabbitMQ(scheduler: Scheduler) : ISchedulerResponseRabbitMQ {
    return {
      schedulerId: scheduler.id,
      startedAt: scheduler.startedAt,
      finishedAt: scheduler.finishedAt,
      amount: scheduler.amount,
      createdAt: scheduler.createdAt,
      updatedAt: scheduler.updatedAt,
      user: {
        id: scheduler.user.id,
        firstName: scheduler.user.firstName,
        lastName: scheduler.user.lastName,
        email: scheduler.user.email,
        createdAt: scheduler.user.createdAt,
        updatedAt: scheduler.user.updatedAt
      }
    }
  } 

}