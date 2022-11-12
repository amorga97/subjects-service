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
    const questionForEvent = {
      ...question,
      id: question._id.toString(),
    };
    delete questionForEvent._id;
    this.data = questionForEvent;
  }

  toString() {
    return JSON.stringify(this);
  }
}
export class UpdateQuestionEvent implements EventData {
  action: QuestionEventActions.UPDATE;
  data: { [key: string]: any };
  constructor(question: Question) {
    const questionForEvent = {
      ...question,
      id: question._id.toString(),
    };
    delete questionForEvent._id;
    this.data = questionForEvent;
  }

  toString() {
    return JSON.stringify(this);
  }
}

export class RemoveQuestionEvent implements EventData {
  action: QuestionEventActions.REMOVE;
  data: { [key: string]: any };
  constructor(data: { id: string }) {
    this.data = data;
  }

  toString() {
    return JSON.stringify(this);
  }
}
