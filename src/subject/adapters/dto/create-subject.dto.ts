import { IsString, MaxLength, ValidateNested } from 'class-validator';

export class CreateSubjectDto {
  @IsString()
  @MaxLength(200)
  title: string;
  @IsString()
  author: string;
  @IsString()
  description?: string;
  @IsString()
  institution?: string;
  @IsString()
  @ValidateNested({ each: true })
  meta_data?: [string, string][];
}
