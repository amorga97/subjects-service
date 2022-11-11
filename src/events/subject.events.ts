import {
  Subject,
  SubjectInDb,
} from 'src/subject/domain/entities/subject.model';
import { EventData } from './events.model';

export const enum SubjectEventActions {
  CREATE = 'SUBJECT_CREATE',
  UPDATE = 'SUBJECT_UPDATE',
  REMOVE = 'SUBJECT_REMOVE',
}

export class CreateSubjectEvent implements EventData {
  action: SubjectEventActions.CREATE;
  data: SubjectInDb;
  constructor(subject: Subject) {
    const subjectForEvent = {
      ...subject,
      id: subject._id.toString(),
    };
    delete subjectForEvent._id;
    this.data = subjectForEvent;
  }
}
export class UpdateSubjectEvent implements EventData {
  action: SubjectEventActions.UPDATE;
  data: SubjectInDb;
  constructor(subject: Subject) {
    const subjectForEvent = {
      ...subject,
      id: subject._id.toString(),
    };
    delete subjectForEvent._id;
    this.data = subjectForEvent;
  }
}

export class RemoveSubjectEvent implements EventData {
  action: SubjectEventActions.REMOVE;
  data: { id: string };
  constructor(data: { id: string }) {
    this.data = data;
  }
}
