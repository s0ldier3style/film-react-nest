import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';

import { configProvider } from './app.config.provider';
import { FilmsModule } from './films/films.module';
import { OrdersModule } from './order/order.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', process.env.CONTENT_URL),
      serveRoot: '/content/afisha/',
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    DatabaseModule,
    FilmsModule,
    OrdersModule,
  ],
  providers: [configProvider],
})
export class AppModule {}
