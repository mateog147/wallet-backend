import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class NotFoundErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err: HttpException) => {
        if (err.getStatus() == 404) {
          console.log('Error searching for id::', err.getResponse());
          throw new HttpException(
            'Review the search constraints',
            HttpStatus.BAD_REQUEST,
          );
        }
        throw err;
      }),
    );
  }
}
