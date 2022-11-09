import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { iSubject } from '../../domain/entities/subject.model';
import { SubjectRepository } from '../../domain/ports/subject.repository';

@Injectable()
export class SubjectInMemoryRepository implements SubjectRepository {
  constructor(
    @InjectModel('Subject') private readonly Subject: Model<iSubject>,
  ) {}

  async create(SubjectData: iSubject) {
    return await this.Subject.create(SubjectData);
  }
  async findById(id: string) {
    return await this.Subject.findById(id);
  }
  async findOne(search: any) {
    return await this.Subject.findOne(search);
  }
  async findByIdAndUpdate(id: string, updatedSubjectData: Partial<iSubject>) {
    return await this.Subject.findByIdAndUpdate(id, updatedSubjectData, {
      new: true,
    });
  }
  async findByIdAndDelete(id: string) {
    return await this.Subject.findByIdAndDelete(id);
  }

  async exists(id: string) {
    return (await this.Subject.exists({ id })) ? true : false;
  }
}