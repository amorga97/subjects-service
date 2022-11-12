import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Question } from 'src/questions/domain/entities/question.model';
import { Subject } from 'src/subject/domain/entities/subject.model';
import { EventData } from './events.model';

@Injectable()
export class EventService {
  constructor(@Inject('COURSES') private readonly coursesClient: ClientKafka) {}

  emit({ topic, info }: EventData<Subject | Question>) {
    this.coursesClient.emit(topic, info);
  }
}
