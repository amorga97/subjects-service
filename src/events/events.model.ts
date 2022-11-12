import { QuestionEventActions } from './question.events';
import { SubjectEventActions } from './subject.events';

export interface EventData {
  action: QuestionEventActions | SubjectEventActions;
  data: { [key: string]: any };
}
