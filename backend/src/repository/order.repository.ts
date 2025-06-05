import { Injectable } from '@nestjs/common';
import { InjectModel, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';

export type OrderDocument = Order & Document;
@Schema()
export class Ticket {
  @Prop({ required: true })
  film: string;

  @Prop({ required: true })
  session: string;

  @Prop({ required: true })
  daytime: string;

  @Prop({ required: true })
  day: string;

  @Prop({ required: true })
  time: string;

  @Prop({ required: true })
  row: number;

  @Prop({ required: true })
  seat: number;

  @Prop({ required: true })
  price: number;
}

@Schema()
export class Order {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ type: [Ticket], required: true })
  tickets: Ticket[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);

@Injectable()
export class OrderRepository {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
  ) {}

  async create(orderDto: Partial<Order>): Promise<Order> {
    const createdOrder = new this.orderModel(orderDto);
    return createdOrder.save();
  }

  async findAll(): Promise<Order[]> {
    return this.orderModel.find().exec();
  }
}