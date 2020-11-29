import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { config } from './config/configuration';

// Create a logger instance
const logger = new Logger('Main');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: config.clientUrl,
    credentials: true,
  });
  await app.listen(3003, () => {
    logger.log('FileService is listening')
  });
}
bootstrap();
