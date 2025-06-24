import { Controller, Get, Param } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmDto } from '../films/dto/films.dto';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  async getAllFilms(): Promise<FilmDto[]> {
    return this.filmsService.getAllFilms();
  }

  @Get(':id/schedule')
  async getFilmById(@Param('id') id: string): Promise<FilmDto['schedule']> {
    return this.filmsService.getFilmSchedule(id);
  }
}
