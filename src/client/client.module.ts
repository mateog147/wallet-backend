import { Module } from '@nestjs/common';
import { ClientController } from './controllers/client/client.controller';
import { ClientService } from './services/client/client.service';
import { AppService } from './services/app/app.service';
import { AppController } from './controllers/app/app.controller';

@Module({
  controllers: [ClientController, AppController],
  providers: [ClientService, AppService]
})
export class ClientModule {}
