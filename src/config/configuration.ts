import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
  clientUrl: process.env.CLIENT_URL,
  awsBucketName: process.env.AWS_S3_BUCKET_NAME
}

export default () => config;