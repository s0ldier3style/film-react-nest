import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
describe('FilmsController', () => {
  let controller: FilmsController;
  let service: FilmsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [FilmsController],
      providers: [FilmsService],
    })
      .overrideProvider(FilmsService)
      .useValue({
        getAllFilms: jest
          .fn()
          .mockResolvedValue([{ id: 'tid1' }, { id: 'tid2' }]),
        getFilmSchedule: jest.fn().mockResolvedValue({ id: 'tid3' }),
      })
      .compile();

    controller = module.get<FilmsController>(FilmsController);
    service = module.get<FilmsService>(FilmsService);
  });

  it('should return an array of films', async () => {
    const result = await controller.getAllFilms();
    expect(result).toEqual([{ id: 'tid1' }, { id: 'tid2' }]);
    expect(service.getAllFilms).toHaveBeenCalled();
  });

  it('should return film schedule by ID', async () => {
    const result = await controller.getFilmById('tid3');
    expect(result).toEqual({ id: 'tid3' });
    expect(service.getFilmSchedule).toHaveBeenCalled();
  });
});
