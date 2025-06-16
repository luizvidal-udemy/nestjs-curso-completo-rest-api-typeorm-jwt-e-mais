import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class SimpleMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('SimpleMiddleware executado');

    req['user'] = {
      name: 'User',
      email: 'user@email.com',
      role: 'ADMIN',
    };

    // return res.status(404).send({
    //   message: 'Não encontrado',
    // });

    next();

    console.log('SimpleMiddleware finalizado após próximo middleware');

    res.on('finish', () => {
      console.log('Responsta enviada');
    });
  }
}
