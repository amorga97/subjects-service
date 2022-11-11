import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { EventData } from './events.model';

@Injectable()
export class EventService {
  constructor(@Inject('COURSES') private readonly coursesClient: ClientKafka) {}

  emit({ action, data }: EventData) {
    this.coursesClient.emit(action, data);
  }
}
