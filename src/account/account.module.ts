import { Module } from '@nestjs/common';
import { AccountController } from './controllers/account/account.controller';
import { MovementsService } from './services/movements/movements.service';
import { AccountService } from './services/account/account.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from '../common/storage/databases/postgres/entities/account.entity';
import { AppEntity } from '../common/storage/databases/postgres/entities/app.entity';
import { ClientEntity } from '../common/storage/databases/postgres/entities/client.entity';
import { MovementEntity } from '../common/storage/databases/postgres/entities/movement.entity';

@Module({
  controllers: [AccountController],
  providers: [MovementsService, AccountService],
  imports: [
    TypeOrmModule.forFeature([
      ClientEntity,
      AppEntity,
      AccountEntity,
      MovementEntity,
    ]),
  ],
})
export class AccountModule {}
