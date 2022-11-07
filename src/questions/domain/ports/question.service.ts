import {
  Inject,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { CreateQuestionDto } from '../../adapters/dto/create-questiondto';
import { UpdateQuestionDto } from '../../adapters/dto/update-question.dto';
import { QuestionRepository } from './question.repository';

@Injectable()
export class QuestionService {
  constructor(
    @Inject()
    private readonly Question: QuestionRepository,
  ) {}
  async create(createQuestionDto: CreateQuestionDto, subjectId: string) {
    try {
      if (!this.Subject.exists({ id: subjectId })) {
        throw new Error(
          'The subject id provided is not associated to any existing subject',
        );
      }
      const question = await this.Question.create(createQuestionDto);
      return {
        question,
      };
    } catch (err) {
      if (err.name === 'ValidationError') {
        throw new NotAcceptableException();
      }
      throw new NotFoundException(err.message);
    }
  }

  findAllBySubject(subjectId: string) {
    if (this.Subject.exists({ id: question })) {
      return this.Question.find({ subject: subjectId });
    }
    throw new NotFoundException();
  }

  async findOne(id: string) {
    const question = await this.Question.findById(id);
    if (question === null) throw new NotFoundException();
    return question;
  }

  async update(id: string, updateQuestionDto: UpdateQuestionDto) {
    const updatedQuestion = await this.Question.findByIdAndUpdate(
      id,
      updateQuestionDto,
    );

    if (updatedQuestion === null) throw new NotFoundException();
    return updatedQuestion;
  }

  async remove(id: string) {
    return await this.Question.findByIdAndDelete(id);
  }
}
