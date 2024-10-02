import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as dotenv from 'dotenv';

async function bootstrap() {
  const port = process.env.PORT || 3002;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useBodyParser('json', { limit: '20mb' });
  app.enableCors({
    origin: '*',
  });
  dotenv.config();
  await app.listen(port);
  console.log('server is running on port ', port);
}
bootstrap();
