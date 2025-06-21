import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../entities/order.entity';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async create(orderDto: Partial<Order>): Promise<Order> {
    const createdOrder = this.orderRepository.create(orderDto);
    return this.orderRepository.save(createdOrder);
  }

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find();
  }
}
