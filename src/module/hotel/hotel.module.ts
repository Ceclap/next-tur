import { Module } from '@nestjs/common';
import { HotelController } from './hotel.controller';
import { HotelService } from './hotel.service';
import { JwtService } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Auth } from "../../core/database/entity/auth.entity";
import { Hotels } from "../../core/database/entity/hotels.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Hotels]),
  ],
  controllers: [HotelController],
  providers: [HotelService, JwtService]
})
export class HotelModule {}
