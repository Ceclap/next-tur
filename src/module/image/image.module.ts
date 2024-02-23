import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { NestMinioModule } from 'nestjs-minio';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    NestMinioModule.register({
      endPoint: '127.0.0.1',
      port: 9000,
      useSSL: false,
      accessKey: 'minio',
      secretKey: 'miniosecret',
    }),
  ],
  providers: [ImageService],
})
export class ImageModule {}
