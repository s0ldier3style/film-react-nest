import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderRepository } from '../repository/order.repository';
import { Order } from '../entities/order.entity';
import { FilmsModule } from 'src/films/films.module';

@Module({
  imports: [TypeOrmModule.forFeature([Order]), FilmsModule],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository],
  exports: [OrderRepository],
})
export class OrdersModule {}
