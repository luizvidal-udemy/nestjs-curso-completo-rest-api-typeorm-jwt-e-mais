import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ParseIntIdPipe } from './common/pipes/parse-int-id.pipe';

// Cliente (Navegador) -> (Servidor) -> Middleware (Request, Response) -> NestJS (Guards, Interceptors, Pipes, Filters)

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //Remove os dados que não estão no DTO
      forbidNonWhitelisted: true, //Retorna um erro se os dados não forem no DTO
      transform: false, //Transforma os dados de params e DTOs
    }),
    new ParseIntIdPipe(),
  );

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
