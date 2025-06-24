import { LoggerService, Injectable } from '@nestjs/common';

@Injectable()
export class TskvLogger implements LoggerService {
  private formatMessage(
    level: string,
    message: any,
    time: string,
    ...optionalParams: any[]
  ) {
    let logMessage = `level=${level}\ttime=${time}\tmessage=${message}\n`;

    optionalParams.forEach((param, index) => {
      logMessage += `\tparam${index + 1}=${param}`;
    });

    return logMessage;
  }

  log(message: any, time: string, ...optionalParams: any[]) {
    console.log(
      this.formatMessage(
        'log',
        message,
        time ?? new Date().toISOString(),
        ...optionalParams,
      ),
    );
  }

  error(message: any, time: string, ...optionalParams: any[]) {
    console.error(
      this.formatMessage(
        'error',
        message,
        time ?? new Date().toISOString(),
        ...optionalParams,
      ),
    );
  }

  warn(message: any, time: string, ...optionalParams: any[]) {
    console.warn(
      this.formatMessage(
        'warn',
        message,
        time ?? new Date().toISOString(),
        ...optionalParams,
      ),
    );
  }

  debug(message: any, time: string, ...optionalParams: any[]) {
    console.debug(
      this.formatMessage(
        'debug',
        message,
        time ?? new Date().toISOString(),
        ...optionalParams,
      ),
    );
  }

  verbose(message: any, time: string, ...optionalParams: any[]) {
    console.info(
      this.formatMessage(
        'verbose',
        message,
        time ?? new Date().toISOString(),
        ...optionalParams,
      ),
    );
  }
}
