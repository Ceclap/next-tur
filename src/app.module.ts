import { Module, ValidationPipe } from '@nestjs/common';
import { AuthModule } from './module/auth/auth.module';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { LoggingInterceptor } from './common/Interceptor/logging.interceptor';
import { HttpExceptionFilter } from './common/httpException.filter';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { CountryModule } from './module/country/country.module';
import { HotelModule } from './module/hotel/hotel.module';
import { ImageModule } from "./module/image/image.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'superUser',
    password: 'eYux2e3e',
    database: 'next_tur',
    synchronize: true,
    entities: [`${__dirname}/core/database/entity/*.entity{.ts,.js}`],
    migrationsTableName: 'migrations',
    migrations: [`${__dirname}/core/database/migrations/*{.ts,.js}`],
  }),
    CountryModule,
    HotelModule,
    ImageModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useValue: new HttpExceptionFilter(),
    },
    {
      provide: APP_INTERCEPTOR,
      useValue: new LoggingInterceptor(),
    },
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({ whitelist: true, transform: true }),
    },
  ],
})
export class AppModule {}
