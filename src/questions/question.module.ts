import { Module } from '@nestjs/common';
import { QuestionService } from './domain/ports/question.service';
import { QuestionController } from './adapters/api/question.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { questionSchema } from './domain/entities/question.model';
import { subjectSchema } from '../subject/domain/entities/subject.model';
import { QuestionInMemoryRepository } from './adapters/db/question-in-memory.repository';
import { QuestionRepository } from './domain/ports/question.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Reservation', schema: questionSchema },
      { name: 'Subject', schema: subjectSchema },
    ]),
  ],
  controllers: [QuestionController],
  providers: [
    QuestionService,
    {
      provide: QuestionRepository,
      useClass: QuestionInMemoryRepository,
    },
  ],
})
export class ReservationModule {}
