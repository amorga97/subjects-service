import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { iOption } from 'src/questions/domain/entities/question.model';

export class CreateQuestionDto {
  @IsNotEmpty()
  @IsString()
  title: string;
  @IsArray()
  @MinLength(3)
  @ValidateNested({ each: true })
  @Type(() => OptionDto)
  options: OptionDto[];
}

export class OptionDto implements iOption {
  @IsString()
  @MaxLength(200)
  @MinLength(25)
  description: string;
  @IsBoolean()
  isCorrect: boolean;
}
