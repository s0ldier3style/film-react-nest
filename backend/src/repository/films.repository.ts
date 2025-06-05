import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

export type FilmDocument = Film & Document;

@Schema()
export class Film {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true })
  title: string;

  @Prop()
  director: string;

  @Prop()
  description: string;

  @Prop()
  rating: number;

  @Prop()
  tags: string[];

  @Prop()
  about: string;

  @Prop()
  image: string;

  @Prop()
  cover: string;

  @Prop({
    type: [
      {
        id: String,
        daytime: Date,
        hall: Number,
        rows: Number,
        seats: Number,
        price: Number,
        taken: [String],
      },
    ],
  })
  schedule: {
    id: string;
    daytime: Date;
    hall: number;
    rows: number;
    seats: number;
    price: number;
    taken: string[];
  }[];
}

export const FilmSchema = SchemaFactory.createForClass(Film);

@Injectable()
export class FilmsRepository {
  constructor(@InjectModel(Film.name) private filmModel: Model<FilmDocument>) {}

  async findAll(): Promise<Film[]> {
    return this.filmModel.find().exec();
  }

  async findById(id: string): Promise<Film> {
    return this.filmModel.findOne({ id }).exec();
  }

  async addTakenSeats(
    filmId: string,
    sessionId: string,
    seats: string[],
  ): Promise<void> {
    await this.filmModel.updateOne(
      { id: filmId, 'schedule.id': sessionId },
      { $push: { 'schedule.$.taken': { $each: seats } } },
    );
  }
}