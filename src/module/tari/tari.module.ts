import { Module } from '@nestjs/common';
import { TariService } from './tari.service';
import { TariController } from './tari.controller';

@Module({
  providers: [TariService],
  controllers: [TariController]
})
export class TariModule {}
