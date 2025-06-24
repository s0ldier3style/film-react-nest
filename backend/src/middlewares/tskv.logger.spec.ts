import { Test, TestingModule } from '@nestjs/testing';
import { TskvLogger } from './tskv.logger';

describe('TskvLogger', () => {
  let logger: TskvLogger;
  let spy: jest.SpyInstance;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TskvLogger],
    }).compile();

    logger = module.get<TskvLogger>(TskvLogger);
    spy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  it('should format log message in TSKV format', () => {
    const message = 'Test TSKV message';
    const optionalParams = ['param1=param1', 'param2=param2'];
    const time = new Date().toISOString();
    logger.log(message, time, ...optionalParams);
    let expected = `level=log\ttime=${time}\tmessage=${message}\n`;
    optionalParams.forEach((param, index) => {
      expected += `\tparam${index + 1}=${param}`;
    });

    expect(spy).toHaveBeenCalledWith(expected);
  });
});
