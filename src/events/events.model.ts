import { QuestionEventActions } from './question-event.actions';
import { SubjectEventActions } from './subject-event.action';

export interface EventData {
  action: QuestionEventActions | SubjectEventActions;
  data: { [key: string]: any };
}
