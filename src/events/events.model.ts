import {
  QuestionEventActions,
  SubjectEventActions,
} from './question-event.actions';

export interface EventData {
  action: QuestionEventActions | SubjectEventActions; //TODO: Create enum of possible actions in courses ms
  data: { [key: string]: any };
}
