import { SubjectInDb } from 'src/subject/domain/entities/subject.model';
import { EventData } from './events.model';

export const enum SubjectEventActions {
  CREATE = 'SUBJECT_CREATE',
  UPDATE = 'SUBJECT_UPDATE',
  REMOVE = 'SUBJECT_REMOVE',
}

export class CreateSubjectEvent implements EventData {
  action: SubjectEventActions.CREATE;
  data: { [key: string]: any };
  constructor(data: SubjectInDb) {
    this.data = data;
  }
}
export class UpdateSubjectEvent implements EventData {
  action: SubjectEventActions.UPDATE;
  data: { [key: string]: any };
  constructor(data: SubjectInDb) {
    this.data = data;
  }
}

export class RemoveSubjectEvent implements EventData {
  action: SubjectEventActions.REMOVE;
  data: { [key: string]: any };
  constructor(data: { id: string }) {
    this.data = data;
  }
}
