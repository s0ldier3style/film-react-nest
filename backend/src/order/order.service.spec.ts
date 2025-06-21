import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { OrderRepository } from '../repository/order.repository';
import { FilmsRepository } from '../repository/films.repository';
import { ConflictException } from '@nestjs/common';
import { CreateOrderDto } from './dto/order.dto';

describe('OrderService', () => {
  let service: OrderService;
  let orderRepository: OrderRepository;
  let filmsRepository: FilmsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: OrderRepository,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn().mockResolvedValue([
              {
                email: 'test@example.com',
                phone: '123456789',
                tickets: [
                  {
                    film: 'film1',
                    session: 'session1',
                    daytime: '2024-01-01T12:00:00',
                    day: 'Monday',
                    time: '12:00',
                    row: 1,
                    seat: 1,
                    price: 100,
                  },
                ],
              },
              {
                email: 'test@example.com',
                phone: '123456789',
                tickets: [
                  {
                    film: 'film1',
                    session: 'session1',
                    daytime: '2024-01-01T12:00:00',
                    day: 'Monday',
                    time: '12:00',
                    row: 1,
                    seat: 2,
                    price: 100,
                  },
                ],
              },
            ]),
          },
        },
        {
          provide: FilmsRepository,
          useValue: {
            addTakenSeats: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
    orderRepository = module.get<OrderRepository>(OrderRepository);
    filmsRepository = module.get<FilmsRepository>(FilmsRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create an order and add taken seats', async () => {
      const createOrderDto: CreateOrderDto = {
        email: 'test@example.com',
        phone: '123456789',
        tickets: [
          {
            film: 'film1',
            session: 'session1',
            daytime: '2024-01-01T12:00:00',
            day: 'Monday',
            time: '12:00',
            row: 1,
            seat: 1,
            price: 100,
          },
        ],
      };

      jest.spyOn(service, 'findOccupiedSeats').mockResolvedValue([]);

      await service.create(createOrderDto);

      expect(orderRepository.create).toHaveBeenCalledWith({
        email: createOrderDto.email,
        phone: createOrderDto.phone,
        tickets: createOrderDto.tickets,
      });

      expect(filmsRepository.addTakenSeats).toHaveBeenCalledWith(
        'film1',
        'session1',
        ['1:1'],
      );
    });

    it('should throw conflict exception if seats are occupied', async () => {
      const createOrderDto: CreateOrderDto = {
        email: 'test@example.com',
        phone: '123456789',
        tickets: [
          {
            film: 'film1',
            session: 'session1',
            daytime: '2024-01-01T12:00:00',
            day: 'Monday',
            time: '12:00',
            row: 1,
            seat: 1,
            price: 100,
          },
        ],
      };

      jest.spyOn(service, 'findOccupiedSeats').mockResolvedValue(['1:1']);

      await expect(service.create(createOrderDto)).rejects.toThrowError(
        new ConflictException('Место с номером 1:1 уже занято'),
      );
    });
  });

  describe('findOccupiedSeats', () => {
    it('should return occupied seats for a session', async () => {
      const occupiedSeats = await service.findOccupiedSeats('session1');

      expect(occupiedSeats).toEqual(['1:1', '1:2']);
      expect(orderRepository.findAll).toHaveBeenCalled();
    });
  });
});
