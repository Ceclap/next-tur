import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TariModule } from './module/tari/tari.module';
import { AuthModule } from './module/auth/auth.module';

@Module({
  imports: [TariModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
