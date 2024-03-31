import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtService } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Auth } from "../../core/database/entity/auth.entity";
import { MailModule } from "../mail/mail.module";
import { MailService } from "../mail/mail.service";


@Module({
  imports: [
    TypeOrmModule.forFeature([Auth]),
    MailModule
  ],
  providers: [AuthService, MailService, JwtService],
  controllers: [AuthController]
})
export class AuthModule {}
