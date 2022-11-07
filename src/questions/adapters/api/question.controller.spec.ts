import { Test, TestingModule } from '@nestjs/testing';
import { CreateReservationDto } from '../dto/create-questiondto';
import { ReservationController } from './question.controller';
import { ReservationService } from '../../domain/ports/question.service';

describe('ReservationController', () => {
  const mockReservation = {
    bar: 'barid1234',
    user: 'userid1234',
    date: new Date(),
    people: 5,
  };

  let controller: ReservationController;
  let service: ReservationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReservationController],
      providers: [
        {
          provide: ReservationService,
          useValue: {
            create: jest.fn(),
            findOne: jest.fn(),
            findAllByBar: jest.fn(),
            findAllByUser: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ReservationController>(ReservationController);
    service = module.get<ReservationService>(ReservationService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('When calling controller.create', () => {
    test('Then service.create should be called', async () => {
      controller.create(mockReservation as CreateReservationDto, 'token');
      expect(service.create).toHaveBeenCalled();
    });
  });

  describe('When calling controller.findAll with a bar id provided', () => {
    test('Then service.findOneByBar should be called', async () => {
      controller.findAll('barid', 'token');
      expect(service.findAllByBar).toHaveBeenCalled();
    });
  });

  describe('When calling controller.findAll with no bar id provided', () => {
    test('Then service.findOneByUser should be called', async () => {
      controller.findAll(undefined, 'token');
      expect(service.findAllByUser).toHaveBeenCalled();
    });
  });

  describe('When calling controller.findOne', () => {
    test('Then service.findOne should be called', async () => {
      controller.findOne('id');
      expect(service.findOne).toHaveBeenCalled();
    });
  });

  describe('When calling controller.update', () => {
    test('Then service.update should be called', async () => {
      await controller.update('', {});
      expect(service.update).toHaveBeenCalled();
    });
  });

  describe('When calling controller.remove', () => {
    test('Then service.findOne should be called', async () => {
      await controller.remove('');
      expect(service.remove).toHaveBeenCalled();
    });
  });
});
