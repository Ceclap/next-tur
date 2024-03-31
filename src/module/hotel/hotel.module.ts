import { Module } from '@nestjs/common';
import { HotelController } from './hotel.controller';
import { HotelService } from './hotel.service';
import { JwtService } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Auth } from "../../core/database/entity/auth.entity";
import { Hotels } from "../../core/database/entity/hotels.entity";
import { ImageService } from "../image/image.service";
import { ConfigModule } from "@nestjs/config";
import { NestMinioModule } from "nestjs-minio";
import { Country } from "../../core/database/entity/country.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Hotels,Country]),
    ConfigModule.forRoot(),
    NestMinioModule.register({
      endPoint: '127.0.0.1',
      port: 9000,
      useSSL: false,
      accessKey: 'minio',
      secretKey: 'miniosecret',
    }),
  ],
  controllers: [HotelController],
  providers: [HotelService, JwtService, ImageService]
})
export class HotelModule {}
