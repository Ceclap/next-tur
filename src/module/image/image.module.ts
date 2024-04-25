import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { NestMinioModule } from 'nestjs-minio';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Hotels } from "../../core/database/entity/hotels.entity";
import { Country } from "../../core/database/entity/country.entity";
import { Photos } from "../../core/database/entity/photo.entity";
import { ImageController } from "./image.controller";
import { JwtService } from "@nestjs/jwt";

@Module({
  imports: [
    TypeOrmModule.forFeature([Hotels,Country,Photos]),
    ConfigModule.forRoot(),
    NestMinioModule.register({
      endPoint: '127.0.0.1',
      port: 9000,
      useSSL: false,
      accessKey: 'minio',
      secretKey: 'miniosecret',
    }),
  ],
  controllers: [ImageController],
  providers: [ImageService, JwtService],
})
export class ImageModule {}
