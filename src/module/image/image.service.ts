import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectMinio } from 'nestjs-minio';
import { Client } from 'minio';
import * as crypto from 'crypto';
import { DeleteImageDto } from "../../common/dto/deleteImage.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Photos } from "../../core/database/entity/photo.entity";
import { Repository } from "typeorm";

@Injectable()
export class ImageService {
  private bucketName = process.env['BUCKET_NAME'] ? process.env['BUCKET_NAME'] : 'photo';

  constructor(
    @InjectMinio() private readonly minioClient: Client,
    @InjectRepository(Photos)
    private readonly photosRepository: Repository<Photos>,
  ) {
    this.initializeBucketPolicy();
  }

  private async initializeBucketPolicy() {
    try {
      const policy = {
        Version: '2012-10-17',
        Statement: [
          {
            Effect: 'Allow',
            Principal: {
              AWS: ['*'],
            },
            Action: [
              's3:ListBucketMultipartUploads',
              's3:GetBucketLocation',
              's3:ListBucket',
            ],
            Resource: ['arn:aws:s3:::photo'],
          },
          {
            Effect: 'Allow',
            Principal: {
              AWS: ['*'],
            },
            Action: [
              's3:PutObject',
              's3:AbortMultipartUpload',
              's3:DeleteObject',
              's3:GetObject',
              's3:ListMultipartUploadParts',
            ],
            Resource: ['arn:aws:s3:::photo/*'],
          },
        ],
      };
      const bucketExists = await this.minioClient.bucketExists(this.bucketName);
      if (!bucketExists) {
        await this.minioClient.makeBucket(this.bucketName).catch((error) => {
          console.error(`Error creating bucket '${this.bucketName}': ${error}`);
        });
      } else {
        console.log(`Bucket '${this.bucketName}' already exists.`);
      }

      await new Promise<void>((resolve, reject) => {
        this.minioClient.setBucketPolicy(
          this.bucketName,
          JSON.stringify(policy),
          (err) => {
            if (err) {
              console.error('Error setting bucket policy:', err);
              reject(err);
            } else {
              console.log('Bucket policy set');
              resolve();
            }
          },
        );
      });
    } catch (error) {
      throw error;
    }
  }
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
    await this.minioClient.putObject(
      this.bucketName,
      fileName,
      file.buffer,
      file.buffer.length,
      metaData
    ).catch((err) => {
      console.log(err);
      throw new HttpException('Error uploading image', 500)
    })
    return fileName
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

  async deleteImage(id: { id: string }) {
    const photo = await this.photosRepository.findOneOrFail({
      where: id
    }).catch(() => {
      throw new HttpException('Photo not found', 404)
    })
    this.minioClient.removeObject(this.bucketName, photo.name, async (err) => {
      if (err) {
        console.error('Eroare la ștergerea fișierului:', err);
      } else {
        await this.photosRepository.delete(id).catch(() => {
          throw new HttpException('Photo not found', 404)
        })      }
    });
    return { message: 'Succes' };
  }
}
