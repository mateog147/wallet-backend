import { Module } from '@nestjs/common';
import { ClientController } from './controllers/client/client.controller';
import { ClientService } from './services/client/client.service';
import { AppService } from './services/app/app.service';
import { AppController } from './controllers/app/app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from '../common/storage/databases/postgres/entities/account.entity';
import { AppEntity } from '../common/storage/databases/postgres/entities/app.entity';
import { ClientEntity } from '../common/storage/databases/postgres/entities/client.entity';
import { MovementEntity } from '../common/storage/databases/postgres/entities/movement.entity';

@Module({
  controllers: [ClientController, AppController],
  providers: [ClientService, AppService],
  imports: [
    TypeOrmModule.forFeature([
      ClientEntity,
      AppEntity,
      AccountEntity,
      MovementEntity,
    ]),
  ],
})
export class ClientModule {}
