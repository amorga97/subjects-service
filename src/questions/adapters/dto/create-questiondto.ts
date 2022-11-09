import { IsNotEmpty } from 'class-validator';
import { iOption } from 'src/questions/domain/entities/question.model';

export class CreateQuestionDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  options: iOption[];
}
