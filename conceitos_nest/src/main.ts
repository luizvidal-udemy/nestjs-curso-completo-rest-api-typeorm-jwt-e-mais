import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //Remove os dados que não estão no DTO
      forbidNonWhitelisted: true, //Retorna um erro se os dados não forem no DTO
      transform: false, //Transforma os dados de params e DTOs
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
