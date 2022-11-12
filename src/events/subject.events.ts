import { Subject } from 'src/subject/domain/entities/subject.model';
import { EventData } from './events.model';

export const enum SubjectEventActions {
  CREATE = 'SUBJECT_CREATE',
  UPDATE = 'SUBJECT_UPDATE',
  REMOVE = 'SUBJECT_REMOVE',
}

export class CreateSubjectEvent implements EventData {
  action: SubjectEventActions.CREATE;
  data: Subject;
  constructor(subject: Subject) {
    this.action = SubjectEventActions.CREATE;
    delete subject._id;
    this.data = subject;
  }

  toString() {
    return JSON.stringify(this);
  }
}
export class UpdateSubjectEvent implements EventData {
  action: SubjectEventActions.UPDATE;
  data: Subject;
  constructor(subject: Subject) {
    this.action = SubjectEventActions.UPDATE;
    delete subject._id;
    this.data = subject;
  }

  toString() {
    return JSON.stringify(this);
  }
}

export class RemoveSubjectEvent implements EventData {
  action: SubjectEventActions.REMOVE;
  data: { id: string };
  constructor(data: { id: string }) {
    this.action = SubjectEventActions.REMOVE;
    this.data = data;
  }

  toString() {
    return JSON.stringify(this);
  }
}
