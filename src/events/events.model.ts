import { QuestionEventActions } from './question.events';
import { SubjectEventActions } from './subject.events';

export interface EventData<T> {
  topic: 'subject' | 'question';
  info: EventInfo<T>;
}

export interface EventInfo<T> {
  action: SubjectEventActions | QuestionEventActions;
  data: T | { id: string };
}
