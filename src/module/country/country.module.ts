import { Module } from '@nestjs/common';
import { CountryController } from './country.controller';
import { CountryService } from './country.service';
import { JwtService } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Hotels } from "../../core/database/entity/hotels.entity";
import { ConfigModule } from "@nestjs/config";
import { Country } from "../../core/database/entity/country.entity";
import { ImageService } from "../image/image.service";
import { NestMinioModule } from "nestjs-minio";

@Module({
  imports: [
    TypeOrmModule.forFeature([Country]),
    NestMinioModule.register({
      endPoint: '127.0.0.1',
      port: 9000,
      useSSL: false,
      accessKey: 'minio',
      secretKey: 'miniosecret',
    }),
  ],
  controllers: [CountryController],
  providers: [CountryService, JwtService, ImageService]
})
export class CountryModule {}
