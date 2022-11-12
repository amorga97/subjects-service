import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Inject,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { SubjectService } from '../../domain/ports/subject.service';
import { CreateSubjectDto } from '../dto/create-subject.dto';
import { UpdateSubjectDto } from '../dto/update-subject.dto';

@Controller('subject')
export class SubjectController {
  constructor(
    private readonly subjectService: SubjectService,
    @Inject('COURSES') private readonly coursesClient: ClientKafka,
  ) {}

  @Post('')
  create(@Body() createSubjectDto: CreateSubjectDto) {
    return this.subjectService.create(createSubjectDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Query('questions') withQuestions: boolean) {
    return this.subjectService.findOne(id, withQuestions);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubjectDto: UpdateSubjectDto) {
    return this.subjectService.update(id, updateSubjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subjectService.remove(id);
  }
}
