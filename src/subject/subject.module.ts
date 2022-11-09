import { Module } from '@nestjs/common';
import { SubjectService } from './domain/ports/subject.service';
import { MongooseModule } from '@nestjs/mongoose';
import { subjectSchema } from './domain/entities/subject.model';
import { SubjectRepository } from './domain/ports/subject.repository';
import { SubjectInMemoryRepository } from './adapters/db/subject-in-memory.repository';
import { SubjectController } from './adapters/api/subject.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Subject', schema: subjectSchema }]),
  ],
  controllers: [SubjectController],
  providers: [
    SubjectService,
    { provide: SubjectRepository, useClass: SubjectInMemoryRepository },
  ],
})
export class SubjectModule {}
