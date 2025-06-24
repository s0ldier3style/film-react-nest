import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { TskvLogger } from './middlewares/tskv.logger';
import { DevLogger } from './middlewares/dev.logger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const logger =
    process.env.NODE_ENV === 'production' ? new TskvLogger() : new DevLogger();

  app.useLogger(logger);

  app.useStaticAssets(join(__dirname, '..', 'public'));

  app.setGlobalPrefix('api/afisha');

  app.enableCors();

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
