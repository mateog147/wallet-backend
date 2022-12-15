import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { configCreateDocument } from './common/config/config-create-document';
import { optionsCreateDocument } from './common/config/options-create-document';
import { MainModule } from './main.module';

async function bootstrap() {
  const app = await NestFactory.create(MainModule);
  app.enableCors();
  SwaggerModule.setup(
    'docs/api',
    app,
    SwaggerModule.createDocument(
      app,
      configCreateDocument,
      optionsCreateDocument,
    ),
  );
  await app.listen(3000);
}
bootstrap();
