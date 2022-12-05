import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { HttpLoggerMiddleware } from './midelwares/http-logger.middleware';
@Module({
  imports: [],
})
export class CommonModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(HttpLoggerMiddleware)
      .forRoutes({ path: 'api/**', method: RequestMethod.ALL });
  }
}
