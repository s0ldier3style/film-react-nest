import { Test, TestingModule } from '@nestjs/testing';
import { FilmsService } from './films.service';
import { FilmsRepository } from '../repository/films.repository';
import { FilmDto } from '../films/dto/films.dto';

describe('FilmsService', () => {
  let service: FilmsService;
  let repository: FilmsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilmsService,
        {
          provide: FilmsRepository,
          useValue: {
            findAll: jest
              .fn()
              .mockResolvedValue([{ id: 'tid1' }, { id: 'tid2' }]),
            findById: jest
              .fn()
              .mockResolvedValue({ id: 'tid1', schedules: [{ id: 'sid1' }] }),
          },
        },
      ],
    }).compile();

    service = module.get<FilmsService>(FilmsService);
    repository = module.get<FilmsRepository>(FilmsRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllFilms', () => {
    it('should return an array of films', async () => {
      const result: FilmDto[] = [{ id: 'tid1' }, { id: 'tid2' }];
      const films = await service.getAllFilms();
      expect(films).toEqual(result);
      expect(repository.findAll).toHaveBeenCalled();
    });
  });

  describe('getFilmSchedule', () => {
    it('should return film schedule by ID', async () => {
      const film = {
        id: 'tid1',
        schedules: [{ id: 'sid1' }],
      };
      const schedule = await service.getFilmSchedule('tid1');
      expect(schedule).toEqual(film.schedules);
      expect(repository.findById).toHaveBeenCalledWith('tid1');
    });
  });
});
