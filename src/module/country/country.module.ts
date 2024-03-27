import { Module } from '@nestjs/common';
import { CountryController } from './country.controller';
import { CountryService } from './country.service';
import { JwtService } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Hotels } from "../../core/database/entity/hotels.entity";
import { ConfigModule } from "@nestjs/config";
import { Country } from "../../core/database/entity/country.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Country]),
  ],
  controllers: [CountryController],
  providers: [CountryService, JwtService]
})
export class CountryModule {}
