import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(`${req.method} ${req.url} ${Date()}`);
    if (req.method == 'POST' || req.method == 'PUT' || req.method == 'PATCH') {
      console.log(req.body);
    }
    next();
  }
}
