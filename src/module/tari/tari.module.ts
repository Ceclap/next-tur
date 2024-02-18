import { Module } from '@nestjs/common';
import { TariService } from './tari.service';
import { TariController } from './tari.controller';
import { JwtService } from "@nestjs/jwt";

@Module({
  providers: [TariService, JwtService],
  controllers: [TariController]
})
export class TariModule {}
