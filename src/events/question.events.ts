import {
  Question,
  QuestionInDb,
} from 'src/questions/domain/entities/question.model';
import { EventData } from './events.model';

export const enum QuestionEventActions {
  CREATE = 'QUESTION_CREATE',
  UPDATE = 'QUESTION_UPDATE',
  REMOVE = 'QUESTION_REMOVE',
}

export class CreateQuestionEvent implements EventData {
  action: QuestionEventActions.CREATE;
  data: { [key: string]: any };
  constructor(data: QuestionInDb<Question>) {
    this.data = data;
  }
}
export class UpdateQuestionEvent implements EventData {
  action: QuestionEventActions.UPDATE;
  data: { [key: string]: any };
  constructor(data: QuestionInDb<Question>) {
    this.data = data;
  }
}

export class RemoveQuestionEvent implements EventData {
  action: QuestionEventActions.REMOVE;
  data: { [key: string]: any };
  constructor(data: { id: string }) {
    this.data = data;
  }
}
