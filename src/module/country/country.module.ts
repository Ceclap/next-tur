import { Module } from '@nestjs/common';
import { CountryController } from './country.controller';
import { CountryService } from './country.service';
import { JwtService } from "@nestjs/jwt";

@Module({
  controllers: [CountryController],
  providers: [CountryService, JwtService]
})
export class CountryModule {}
