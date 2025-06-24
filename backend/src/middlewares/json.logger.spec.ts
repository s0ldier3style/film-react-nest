import { Test, TestingModule } from '@nestjs/testing';
import { JsonLogger } from './json.logger';

describe('JsonLogger', () => {
  let logger: JsonLogger;
  let spy: jest.SpyInstance;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JsonLogger],
    }).compile();

    logger = module.get<JsonLogger>(JsonLogger);
    spy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  it('should format log message in JSON format', () => {
    const message = 'Test log message';
    const optionalParams = ['param1', 'param2'];

    logger.log(message, ...optionalParams);

    expect(spy).toHaveBeenCalledWith(
      '{"level":"log","message":"Test log message","optionalParams":["param1","param2"]}',
    );
  });
});
