import { Module } from '@nestjs/common';
import { AccountController } from './controllers/account/account.controller';
import { MovementsController } from './controllers/movements/movements.controller';
import { MovementsService } from './services/movements/movements.service';
import { AccountService } from './services/account/account.service';

@Module({
  controllers: [AccountController, MovementsController],
  providers: [MovementsService, AccountService]
})
export class AccountModule {}
