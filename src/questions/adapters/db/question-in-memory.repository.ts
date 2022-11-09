import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { iQuestion } from '../../domain/entities/question.model';
import { QuestionRepository } from '../../domain/ports/question.repository';

@Injectable()
export class QuestionInMemoryRepository implements QuestionRepository {
  constructor(
    @InjectModel('Question')
    private readonly Question: Model<iQuestion>,
  ) {}

  async find(searchObject: FilterQuery<iQuestion>) {
    return await this.Question.find(searchObject);
  }

  async create(questionData: iQuestion) {
    // TODO: Check whether sibject exists in DB
    const question = await this.Question.create(questionData);
    return question;
  }

  async findById(id: string) {
    return await this.Question.findById(id);
  }

  async findByIdAndUpdate(id: string, updateQuestionData: Partial<iQuestion>) {
    return await this.Question.findByIdAndUpdate(id, updateQuestionData, {
      new: true,
    });
  }
  async findByIdAndDelete(id: string) {
    const reservation = await this.Question.findById(id);
    if (reservation === null) throw new NotFoundException();
    return await reservation.delete();
  }
}