import { Question } from '../questions/domain/entities/question.model';
import { EventData } from './events.model';

export const enum QuestionEventActions {
  CREATE = 'QUESTION_CREATE',
  UPDATE = 'QUESTION_UPDATE',
  REMOVE = 'QUESTION_REMOVE',
}

export class CreateQuestionEvent implements EventData {
  action: QuestionEventActions.CREATE;
  data: { [key: string]: any };
  constructor(question: Question) {
    this.action = QuestionEventActions.CREATE;
    this.data = question;
  }

  toString() {
    return JSON.stringify(this);
  }
}
export class UpdateQuestionEvent implements EventData {
  action: QuestionEventActions.UPDATE;
  data: { [key: string]: any };
  constructor(question: Question) {
    this.action = QuestionEventActions.UPDATE;
    this.data = question;
  }

  toString() {
    return JSON.stringify(this);
  }
}

export class RemoveQuestionEvent implements EventData {
  action: QuestionEventActions.REMOVE;
  data: { [key: string]: any };
  constructor(data: { id: string }) {
    this.action = QuestionEventActions.REMOVE;
    this.data = data;
  }

  toString() {
    return JSON.stringify(this);
  }
}
