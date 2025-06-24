import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/order.dto';

describe('OrderController', () => {
  let controller: OrderController;
  let service: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [OrderService],
    })
      .overrideProvider(OrderService)
      .useValue({
        create: jest.fn().mockResolvedValue([{ id: 'ticket1' }]),
      })
      .compile();

    controller = module.get<OrderController>(OrderController);
    service = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create an order', async () => {
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

      const result = await controller.create(createOrderDto);

      expect(result).toEqual([{ id: 'ticket1' }]);
      expect(service.create).toHaveBeenCalledWith(createOrderDto);
    });
  });
});
