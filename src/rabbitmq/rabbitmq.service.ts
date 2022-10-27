import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Channel, connect, Connection } from 'amqplib';

@Injectable()
export class RabbitService {
  async publishInExchange(
    message: any): Promise<void> {
    const connection = await this._connect();
    const channel = await this._createChannel(connection);

    try {
      await channel.assertExchange('amq.topic', 'topic', { durable: true });
      channel.publish('amq.topic','notificationEvaluationQueue',Buffer.from(JSON.stringify(message)));
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    } finally {
      await this._close(connection, channel);
    }
  }

  async _connect(): Promise<Connection> {
    return connect(`amqp://guest:guest@localhost:5672/`).catch((error) => {
      throw new InternalServerErrorException(error.message);
    });
  }

  async _createChannel(connection: Connection): Promise<Channel> {
    return connection.createChannel().catch(async (error) => {
      throw new InternalServerErrorException(error.message);
    });
  }

  async _close(connection: Connection, channel: Channel): Promise<void> {
    try {
      await channel.close();
      await connection.close();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
