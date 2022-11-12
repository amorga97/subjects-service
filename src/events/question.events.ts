import { Question } from '../questions/domain/entities/question.model';
import { EventData, EventInfo } from './events.model';

export const enum QuestionEventActions {
  CREATE = 'QUESTION_CREATE',
  UPDATE = 'QUESTION_UPDATE',
  REMOVE = 'QUESTION_REMOVE',
}

export class CreateQuestionEvent implements EventData<Question> {
  topic: 'question';
  info: EventInfo<Question>;
  constructor(question: Question) {
    this.topic = 'question';
    this.info = { action: QuestionEventActions.CREATE, data: question };
  }

  toString() {
    return JSON.stringify(this);
  }
}
export class UpdateQuestionEvent implements EventData<Question> {
  topic: 'question';
  info: EventInfo<Question>;
  constructor(question: Question) {
    this.topic = 'question';
    this.info = { action: QuestionEventActions.UPDATE, data: question };
  }

  toString() {
    return JSON.stringify(this);
  }
}

export class RemoveQuestionEvent implements EventData<Question> {
  topic: 'question';
  info: EventInfo<Question>;
  constructor(data: { id: string }) {
    this.topic = 'question';
    this.info = this.info = { action: QuestionEventActions.REMOVE, data };
  }

  toString() {
    return JSON.stringify(this);
  }
}
