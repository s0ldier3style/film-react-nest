import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import {
  Order,
  OrderSchema,
  OrderRepository,
} from '../repository/order.repository';
import {
  Film,
  FilmSchema,
  FilmsRepository,
} from 'src/repository/films.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    MongooseModule.forFeature([{ name: Film.name, schema: FilmSchema }]),
  ],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository, FilmsRepository],
  exports: [OrderRepository],
})
export class OrderModule {}
