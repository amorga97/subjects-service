import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(@Inject('USERS') private readonly usersClient: ClientKafka) {}

  getHello(): string {
    return 'Hello World!';
  }

  sendEvent(event: string) {
    this.usersClient.emit('user-created', {
      event,
    });
  }
}
