import { iOption } from 'src/questions/domain/entities/question.model';

export class CreateQuestionDto {
  subject: string;
  title: string;
  options: iOption[];
}
