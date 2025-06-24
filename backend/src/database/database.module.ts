import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from '../entities/film.entity';
import { Schedules } from '../entities/schedule.entity';
import { Order } from '../entities/order.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [Film, Schedules, Order],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Film, Schedules, Order]),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
