import { Injectable } from '@nestjs/common';
import { FilmsRepository } from '../repository/films.repository';
import { FilmDto } from '../films/dto/films.dto';
@Injectable()
export class FilmsService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async getAllFilms(): Promise<FilmDto[]> {
    return await this.filmsRepository.findAll();
  }

  async getFilmSchedule(id: string): Promise<FilmDto['schedule']> {
    const film = await this.filmsRepository.findById(id);
    return film.schedules;
  }
}
