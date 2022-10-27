import { IUserResponseRabbitMQ } from "./user";

export interface ISchedulerResponseRabbitMQ {
  schedulerId: number;
  startedAt: Date;
  finishedAt: Date;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
  user: IUserResponseRabbitMQ;
}