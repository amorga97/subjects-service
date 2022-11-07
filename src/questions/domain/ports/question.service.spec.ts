import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { QuestionInMemoryRepository } from 'src/questions/adapters/db/question-in-memory.repository';
import { CreateQuestionDto } from 'src/questions/adapters/dto/create-questiondto';
import { iOption, iQuestion, questionSchema } from '../entities/question.model';
import { QuestionRepository } from './question.repository';
import { QuestionService } from './question.service';

describe('QuestionService', () => {
  const mockOption = {
    description: 'mock option',
    isCorrect: false,
  };

  const mockQuestion: Omit<iQuestion, '_id'> = {
    options: [
      mockOption,
      mockOption,
      mockOption,
      { ...mockOption, isCorrect: true },
    ],
    subject: 'someSubjectId',
    title: 'test question',
  };

  const mockBar = {
    id: 'testID',
    reservations: [],
    save: jest.fn(),
  };

  const mockSubjectModel = {
    findById: jest.fn().mockResolvedValue(mockBar),
    findByIdAndUpdate: jest.fn().mockResolvedValue(mockBar),
    exists: jest.fn().mockReturnValue(true),
  };

  const mockSubjectId = '62b9a9f34e0dfa462d7dcbaf';

  const mockQuestionModel = {
    create: jest.fn().mockResolvedValue(mockQuestion),
    find: jest.fn().mockReturnValue(mockQuestion),
    findById: jest.fn().mockReturnValue(mockQuestion),
    findByIdAndUpdate: jest
      .fn()
      .mockReturnValue({ ...mockQuestion, title: 'altered description' }),
    findByIdAndDelete: jest.fn().mockResolvedValue(mockQuestion),
  };

  let service: QuestionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuestionService,
        {
          provide: QuestionRepository,
          useClass: QuestionInMemoryRepository,
        },
      ],
      imports: [
        MongooseModule.forFeature([
          { name: 'Question', schema: questionSchema },
          { name: 'Subject', schema: subjectSchema },
        ]),
      ],
    })
      .overrideProvider(getModelToken('Question'))
      .useValue(mockQuestionModel)
      .overrideProvider(getModelToken('Subject'))
      .useValue(mockSubjectModel)
      .compile();

    service = module.get<QuestionService>(QuestionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('When calling service.create with valid params', () => {
    test('It should create a new question', async () => {
      mockQuestionModel.create.mockResolvedValueOnce({
        ...mockQuestion,
        _id: '62b9a9f34e0dfa462d7dcbaf',
        subject: mockSubjectId,
      });
      const result = await service.create(mockQuestion, mockSubjectId);
      expect(result).toHaveProperty('question', {
        ...mockQuestion,
        _id: '62b9a9f34e0dfa462d7dcbaf',
        subject: mockSubjectId,
      });
    });
  });

  describe('When calling service.create with invalid request body', () => {
    test('It should throw an error', async () => {
      mockQuestionModel.create.mockImplementation(async () => {
        const error = new Error();
        error.name = 'ValidationError';
        throw error;
      });
      expect(async () => {
        await service.create(mockQuestion, mockSubjectId);
      }).rejects.toThrow();
    });
  });

  describe('When calling service.create with the id of a non existing subject', () => {
    test('It should throw an error', async () => {
      mockSubjectModel.exists.mockResolvedValue(null);
      expect(async () => {
        await service.create(mockQuestion, mockSubjectId);
      }).rejects.toThrow();
    });
  });

  describe('When calling service.create without all necessary params', () => {
    test('It should throw an error', async () => {
      expect(async () => {
        await service.create(
          { title: 'test' } as unknown as CreateQuestionDto,
          'token',
        );
      }).rejects.toThrow();
    });
  });

  describe('When calling service.create with wrongly typed params', () => {
    test('It should throw an error', async () => {
      expect(async () => {
        await service.create(
          {
            ...mockQuestion,
            title: 123,
          } as unknown as CreateQuestionDto,
          'token',
        );
      }).rejects.toThrow();
    });
  });

  describe('When calling service.findAllBySubject with an existing subject id', () => {
    test('It should return an array of questions', async () => {
      mockQuestionModel.find.mockReturnValueOnce([mockQuestion]);
      expect(await service.findAllBySubject(mockSubjectId)).toEqual([
        mockQuestion,
      ]);
    });
  });

  describe('When calling service.findAllByBar with a non existing subject id', () => {
    test('It should throw an error', async () => {
      mockSubjectModel.exists.mockReturnValue(false);
      expect(async () => {
        await service.findAllBySubject(mockSubjectId);
      }).rejects.toThrow();
    });
  });

  describe('When calling service.findOne with an existing question id', () => {
    test('It should return a question', async () => {
      expect(await service.findOne('id')).toEqual(mockQuestion);
    });
  });

  describe('When calling service.findOne with a non existing question id', () => {
    test('It should throw an error', async () => {
      mockQuestionModel.findById.mockReturnValue(null);
      expect(async () => {
        await service.findOne('id');
      }).rejects.toThrow();
    });
  });

  describe('When calling service.update with an existing question id', () => {
    test('It should return the updated question', async () => {
      mockQuestionModel.findByIdAndUpdate.mockReturnValueOnce({
        populate: jest.fn().mockReturnValue({
          populate: jest.fn().mockResolvedValue({
            ...mockQuestion,
            _id: '62b9a9f34e0dfa462d7dcbaf',
            subject: mockSubjectId,
          }),
        }),
      });
      const result = await service.update('id', {
        ...mockQuestion,
        title: 'updated',
      });
      expect(result).toHaveProperty('question', {
        ...mockQuestion,
        _id: '62b9a9f34e0dfa462d7dcbaf',
        subject: mockSubjectId,
      });
    });
  });

  describe('When calling service.update with a non existing question id', () => {
    test('It should throw an error', async () => {
      mockQuestionModel.findByIdAndUpdate.mockReturnValue({
        populate: jest.fn().mockReturnValue({
          populate: jest.fn().mockResolvedValue(null),
        }),
      }),
        expect(async () => {
          await service.update('id', { ...mockQuestion, title: 'updated' });
        }).rejects.toThrow();
    });
  });

  describe('When calling service.delete with an existing question id', () => {
    test('It should return the deleted question', async () => {
      mockQuestionModel.findById.mockResolvedValueOnce({
        delete: jest.fn().mockResolvedValue(mockQuestion),
        id: 'id',
      });
      expect(await service.remove('id')).toEqual(mockQuestion);
    });
  });

  describe('When calling service.delete with a non existing question id', () => {
    test('It should throw an error', async () => {
      mockQuestionModel.findById.mockResolvedValueOnce(null);
      expect(async () => {
        await service.remove('id');
      }).rejects.toThrow();
    });
  });

  describe('When calling service.delete with an existing question id but the user does not exist', () => {
    test('It should throw an error', async () => {
      mockQuestionModel.findById.mockResolvedValueOnce({
        delete: jest.fn().mockResolvedValue(mockQuestion),
        id: 'id',
      });
      mockUserModel.findByIdAndUpdate.mockResolvedValue(null);
      expect(async () => {
        await service.remove('id');
      }).rejects.toThrow();
    });
  });
});
