import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateSubjectEvent,
  RemoveSubjectEvent,
  UpdateSubjectEvent,
} from '../../../events/subject.events';
import { EventService } from '../../../events/event-service.service';
import { QuestionRepository } from '../../../questions/domain/ports/question.repository';
import { CreateSubjectDto } from '../../adapters/dto/create-subject.dto';
import { UpdateSubjectDto } from '../../adapters/dto/update-subject.dto';
import { SubjectRepository } from './subject.repository';

@Injectable()
export class SubjectService {
  constructor(
    @Inject(SubjectRepository) private readonly Subject: SubjectRepository,
    @Inject(QuestionRepository) private readonly Question: QuestionRepository,
    public readonly eventService: EventService,
  ) {}
  async create(createSubjectDto: CreateSubjectDto) {
    try {
      const registeredSubject = await this.Subject.create(createSubjectDto);
      this.eventService.emit(new CreateSubjectEvent(registeredSubject));
      return registeredSubject;
    } catch (err) {
      if (err.code === 11000)
        throw new ConflictException(
          'A Subject is already registered with the information you provided',
        );
    }
  }

  async findOne(id: string, withQuestions: boolean) {
    const subject = await this.Subject.findById(id);
    if (subject === null) throw new NotFoundException();
    if (withQuestions) {
      const questions = await this.Question.find({ subject: subject._id });
      return { ...subject, questions };
    }
    return subject;
  }

  async update(id: string, updateSubjectDto: UpdateSubjectDto) {
    const updatedSubject = await this.Subject.findByIdAndUpdate(id, {
      ...updateSubjectDto,
    });
    if (updatedSubject === null)
      throw new NotFoundException('Subject not found');
    this.eventService.emit(new UpdateSubjectEvent(updatedSubject));
    return updatedSubject;
  }

  async remove(id: string) {
    const removedSubject = await this.Subject.findByIdAndDelete(id);
    this.eventService.emit(new RemoveSubjectEvent({ id }));
    return removedSubject;
  }
}
