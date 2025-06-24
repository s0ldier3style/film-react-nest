import { Injectable, ConflictException } from '@nestjs/common';
import { OrderRepository } from '../repository/order.repository';
import { CreateOrderDto } from './dto/order.dto';
import { FilmsRepository } from '../repository/films.repository';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly filmRepository: FilmsRepository,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const occupiedSeats = await this.findOccupiedSeats(
      createOrderDto.tickets[0].session,
    );

    const notOccupiedSeats = [];

    for (const ticket of createOrderDto.tickets) {
      const seat = `${ticket.row}:${ticket.seat}`;
      if (occupiedSeats.includes(seat)) {
        throw new ConflictException(`Место с номером ${seat} уже занято`);
      }
      notOccupiedSeats.push(seat);
    }

    await this.orderRepository.create({
      email: createOrderDto.email,
      phone: createOrderDto.phone,
      tickets: createOrderDto.tickets,
    });

    const { film, session } = createOrderDto.tickets[0];
    await this.filmRepository.addTakenSeats(film, session, notOccupiedSeats);

    return createOrderDto.tickets;
  }

  async findAll() {
    return this.orderRepository.findAll();
  }

  async findOccupiedSeats(sessionId: string): Promise<string[]> {
    const orders = await this.orderRepository.findAll();
    const occupiedSeats: string[] = [];

    orders.forEach((order) => {
      order.tickets.forEach((ticket) => {
        if (ticket.session === sessionId) {
          const seat = `${ticket.row}:${ticket.seat}`;
          occupiedSeats.push(seat);
        }
      });
    });

    return occupiedSeats;
  }
}
