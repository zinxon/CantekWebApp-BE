import cookieParser from 'cookie-parser';

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser()); // cookie parser middleware
  app.useGlobalPipes(new ValidationPipe({ forbidUnknownValues: true }));
  app.enableCors({
    // add multiple origins here
    origin: [
      'http://localhost:3000/',
      'https://f983-2607-fea8-f81b-8320-7d65-49ed-ffb3-6e11.ngrok-free.app/',
    ],
    credentials: true,
  });
  await app.listen(3000);
}
bootstrap();
