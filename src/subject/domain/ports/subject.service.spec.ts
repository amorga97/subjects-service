import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { iSubject, subjectSchema } from '../entities/subject.model';
import { SubjectService } from './subject.service';
import { SubjectRepository } from './subject.repository';
import { SubjectInMemoryRepository } from '../../adapters/db/subject-in-memory.repository';
import {
  iQuestion,
  questionSchema,
} from '../../../questions/domain/entities/question.model';
import { QuestionRepository } from '../../../questions/domain/ports/question.repository';
import { QuestionInMemoryRepository } from '../../../questions/adapters/db/question-in-memory.repository';

describe('SubjectService', () => {
  let service: SubjectService;

  const mockAuthorId = '62b9a9f34e0dfa462d7dcbaf';

  const mockSubject: iSubject = {
    title: 'test subject',
    author: mockAuthorId,
  };

  const mockQuestion: iQuestion = {
    subject: '123123123',
    title: 'Test',
    options: [
      {
        description: 'this is a test option',
        isCorrect: true,
      },
    ],
  };

  const mockSubjectModel = {
    create: jest.fn().mockResolvedValue(mockSubject),
    findOne: jest.fn().mockResolvedValue(mockSubject),
    findById: jest.fn().mockResolvedValue(mockSubject),
    findByIdAndUpdate: jest
      .fn()
      .mockResolvedValue({ ...mockSubject, title: 'updated' }),
    findByIdAndDelete: jest.fn().mockResolvedValue(mockSubject),
  };

  const mockQuestionModel = {
    find: jest.fn().mockResolvedValue([mockQuestion]),
    deleteMany: jest.fn().mockResolvedValue({ deletedCount: 1 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SubjectService,
        { provide: SubjectRepository, useClass: SubjectInMemoryRepository },
        { provide: QuestionRepository, useClass: QuestionInMemoryRepository },
      ],
      imports: [
        MongooseModule.forFeature([{ name: 'Subject', schema: subjectSchema }]),
        MongooseModule.forFeature([
          { name: 'Question', schema: questionSchema },
        ]),
      ],
    })
      .overrideProvider(getModelToken('Subject'))
      .useValue(mockSubjectModel)
      .overrideProvider(getModelToken('Question'))
      .useValue(mockQuestionModel)
      .compile();

    service = module.get<SubjectService>(SubjectService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('When calling service.create with a new subjects info', () => {
    test('Then it should return the new subject saved to the DB', async () => {
      expect(await service.create(mockSubject)).toEqual(mockSubject);
    });
  });

  describe('When calling service.create with info from an already registered subject', () => {
    test('Then it should throw an error', async () => {
      mockSubjectModel.create.mockImplementation(async () => {
        const error = { code: 11000 };
        throw error;
      });
      expect(async () => {
        await service.create(mockSubject);
      }).rejects.toThrow();
    });
  });

  describe('When calling service.findOne with a valid subject id with questions', () => {
    test('Then it should return the subject from the db', async () => {
      const result = await service.findOne('id', true);
      expect(result).toEqual({ ...mockSubject, questions: [mockQuestion] });
    });
  });

  describe('When calling service.findOne with a valid subject id without questions', () => {
    test('Then it should return the subject from the db', async () => {
      expect(await service.findOne('id', false)).toEqual(mockSubject);
    });
  });

  describe('When calling service.findOne with an invalid subject id', () => {
    test('Then it should throw an error', async () => {
      mockSubjectModel.findById.mockResolvedValueOnce(null);
      expect(async () => {
        await service.findOne('id', false);
      }).rejects.toThrow();
    });
  });

  describe('When calling service.update with a valid subject id', () => {
    test('Then it should return the updated subject data', async () => {
      expect(
        await service.update('id', { ...mockSubject, title: 'updated' }),
      ).toEqual({ ...mockSubject, title: 'updated' });
    });
  });

  describe('When calling service.update with an invalid subject id', () => {
    test('Then it should throw an error', async () => {
      mockSubjectModel.findByIdAndUpdate.mockResolvedValueOnce(null);
      expect(async () => {
        await service.update('id', { ...mockSubject, title: 'updated' });
      }).rejects.toThrow();
    });
  });

  describe('When calling service.remove with a valid subject id', () => {
    test('Then it should return the deleted subject', async () => {
      expect(await service.remove('id')).toEqual(mockSubject);
    });
  });

  describe('When calling service.remove with an invalid subject id', () => {
    test('Then it should throw an error', async () => {
      mockSubjectModel.findByIdAndDelete.mockResolvedValueOnce(null);
      expect(async () => {
        await service.remove('id');
      }).rejects.toThrow();
    });
  });
});
