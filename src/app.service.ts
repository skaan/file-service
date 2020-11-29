import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import aws, { S3 } from 'aws-sdk';
import fs from 'fs';
import path from 'path'

@Injectable()
export class AppService {
  private s3: S3;

  constructor(
    private configService: ConfigService
  ) {
    this.s3 = new aws.S3();
  }

  async uploadFile(fields, files): Promise<any> {
    const folder = fields.folder[0];
    const tempPath = files.file[0].path;
    const fileName = files.file[0].originalFilename;

    const fileEnding = fileName.split('.')[fileName.split('.').length - 1]

    const params = {
      Bucket: this.configService.get<string>('awsBucketName'),
      Body : fs.createReadStream(tempPath),
      Key : `${folder + '/' || ''}${Date.now()}.${fileEnding}`,
      ACL:'public-read'
    };

    return this.s3.upload(params).promise();
  }
}
