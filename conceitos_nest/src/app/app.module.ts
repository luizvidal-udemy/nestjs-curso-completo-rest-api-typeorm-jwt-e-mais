import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppExceptionFilter } from 'src/common/filters/app-exception.filter';
import { IsAdminGuard } from 'src/common/guards/is-admin.guard';
import { AnotherMiddleware } from 'src/common/middlewares/another.middleware';
import { SimpleMiddleware } from 'src/common/middlewares/simple.middleware';
import { PessoasModule } from 'src/pessoas/pessoas.module';
import { RecadosModule } from 'src/recados/recados.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    // ConceitosManualModule,
    // ConceitosAutomaticoModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      autoLoadEntities: true,
      synchronize: true, //false em prod
    }),
    RecadosModule,
    PessoasModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AppExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: IsAdminGuard,
    },
  ],
  exports: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SimpleMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });

    consumer.apply(AnotherMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
