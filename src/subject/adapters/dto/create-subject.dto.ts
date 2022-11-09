export class CreateSubjectDto {
  title: string;
  author: string;
  description?: string;
  institution?: string;
  meta_data?: [string, string][];
}
