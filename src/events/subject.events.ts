import { Subject } from 'src/subject/domain/entities/subject.model';
import { EventData, EventInfo } from './events.model';

export const enum SubjectEventActions {
  CREATE = 'SUBJECT_CREATE',
  UPDATE = 'SUBJECT_UPDATE',
  REMOVE = 'SUBJECT_REMOVE',
}

export class CreateSubjectEvent implements EventData<Subject> {
  topic: 'subject';
  info: EventInfo<Subject>;
  constructor(subject: Subject) {
    this.topic = 'subject';
    this.info = { action: SubjectEventActions.CREATE, data: subject };
  }

  toString() {
    return JSON.stringify(this);
  }
}
export class UpdateSubjectEvent implements EventData<Subject> {
  topic: 'subject';
  info: EventInfo<Subject>;
  constructor(subject: Subject) {
    this.topic = 'subject';
    this.info = { action: SubjectEventActions.UPDATE, data: subject };
  }

  toString() {
    return JSON.stringify(this);
  }
}

export class RemoveSubjectEvent implements EventData<Subject> {
  topic: 'subject';
  info: EventInfo<Subject>;
  constructor(data: { id: string }) {
    this.topic = 'subject';
    this.info = { action: SubjectEventActions.REMOVE, data };
  }

  toString() {
    return JSON.stringify(this);
  }
}
