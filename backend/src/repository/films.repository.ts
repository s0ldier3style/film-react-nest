import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Film } from '../entities/film.entity';
import { Schedules } from '../entities/schedule.entity';

@Injectable()
export class FilmsRepository {
  constructor(
    @InjectRepository(Film)
    private readonly filmRepository: Repository<Film>,
    @InjectRepository(Schedules)
    private readonly shedulesRepository: Repository<Schedules>,
  ) {}

  async findAll(): Promise<Film[]> {
    try {
      return this.filmRepository.find({ relations: ['schedules'] });
    } catch (error) {
      return [];
    }
  }

  async findById(id: string): Promise<Film> {
    return this.filmRepository.findOne({
      where: { id },
      relations: ['schedules'],
    });
  }

  async addTakenSeats(
    filmId: string,
    sessionId: string,
    seats: string[],
  ): Promise<void> {
    const film = await this.filmRepository.findOne({
      where: { id: filmId },
      relations: ['schedules'],
    });

    if (film) {
      const schedule = film.schedules.find((s) => s.id === sessionId);
      if (schedule) {
        schedule.taken = [...new Set([...schedule.taken, ...seats])];
        await this.shedulesRepository.save(schedule);
      }
    }
  }
}
