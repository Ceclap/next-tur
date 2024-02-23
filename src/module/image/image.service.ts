import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectMinio } from 'nestjs-minio';
import { Client } from 'minio';
import * as crypto from 'crypto';
import { DeleteImageDto } from "../../common/dto/deleteImage.dto";

@Injectable()
export class ImageService {
  private bucketName = process.env['BUCKET_NAME'] ? process.env['BUCKET_NAME'] : 'userPhoto';

  constructor(
    @InjectMinio() private readonly minioClient: Client,
  ) {}


  public async upload(file) {
    file.buffer = Buffer.from(file.buffer);
    if (!(file.mimetype.includes('jpeg') || file.mimetype.includes('png'))) {
      throw new HttpException(
        'File type not supported',
        HttpStatus.BAD_REQUEST,
      );
    }
    const timestamp = Date.now().toString();
    const hashedFileName = crypto
      .createHash('md5')
      .update(timestamp)
      .digest('hex');
    const extension = file.originalname.substring(
      file.originalname.lastIndexOf('.'),
      file.originalname.length,
    );
    const metaData = {
      'Content-Type': file.mimetype,
    };
    const fileName = hashedFileName + extension;
    this.minioClient.putObject(
      this.bucketName,
      fileName,
      file.buffer,
      file.buffer.length,
      metaData,
      function (err) {
        if (err) {
          throw new HttpException(
            'Error uploading file',
            HttpStatus.BAD_REQUEST,
          );
        }
      },
    );

    return fileName;
  }

  async getFromS3(name: string) {
    const result = new Promise((resolve) => {
      this.minioClient.presignedGetObject(this.bucketName, name, (err, url) => {
        if (err) {
          console.error('Eroare la obținerea URL-ului semnat:', err);
          throw new HttpException('Error geting Photo From S3', 500)
        }
        resolve(url);
      });
    });
    return await result;
  }

  async deleteImage(data: DeleteImageDto) {
    this.minioClient.removeObject(this.bucketName, data.name, async (err) => {
      if (err) {
        console.error('Eroare la ștergerea fișierului:', err);
      } else {
//sterge din baza de date
        console.log('Fișierul a fost șters cu succes!');
      }
    });
    return { message: 'Succes' };
  }
}
