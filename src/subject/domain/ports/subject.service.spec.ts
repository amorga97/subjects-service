import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { iSubject, subjectSchema } from '../entities/subject.model';
import { SubjectService } from './subject.service';
import { SubjectRepository } from './subject.repository';
import { SubjectInMemoryRepository } from '../../adapters/db/subject-in-memory.repository';

describe('SubjectService', () => {
  let service: SubjectService;

  const mockAuthorId = '62b9a9f34e0dfa462d7dcbaf';

  const mockSubject: iSubject = {
    title: 'test subject',
    author: mockAuthorId,
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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SubjectService,
        { provide: SubjectRepository, useClass: SubjectInMemoryRepository },
      ],
      imports: [
        MongooseModule.forFeature([{ name: 'Subject', schema: subjectSchema }]),
      ],
    })
      .overrideProvider(getModelToken('Subject'))
      .useValue(mockSubjectModel)
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

  describe('When calling service.findOne with a valid subject id', () => {
    test('Then it should return the subject from the db', async () => {
      mockSubjectModel.findById.mockResolvedValue(mockSubject);
      expect(await service.findOne('id')).toEqual(mockSubject);
    });
  });

  describe('When calling service.findOne with an invalid subject id', () => {
    test('Then it should throw an error', async () => {
      mockSubjectModel.findById.mockResolvedValue(null);
      expect(async () => {
        await service.findOne('id');
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
      mockSubjectModel.findByIdAndUpdate.mockResolvedValue(null);
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
      mockSubjectModel.findByIdAndDelete.mockResolvedValue(null);
      expect(async () => {
        await service.remove('id');
      }).rejects.toThrow();
    });
  });
});
