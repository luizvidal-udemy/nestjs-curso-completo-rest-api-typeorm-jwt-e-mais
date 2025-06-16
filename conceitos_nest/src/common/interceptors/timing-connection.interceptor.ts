import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { tap } from 'rxjs';

@Injectable()
export class TimingConnectionInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    const startTime = Date.now();
    const request = context.switchToHttp().getRequest();
    const url = request.url;
    const method = request.method;

    return next.handle().pipe(
      tap((response) => {
        const endTime = Date.now();
        const elapsedTime = endTime - startTime;
        console.log(`${method} ${url} - Tempo de execução: ${elapsedTime}ms`);
        console.log(response);
      }),
    );
  }
}
