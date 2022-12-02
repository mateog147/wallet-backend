import { Module } from '@nestjs/common';
import { AccountController } from './controllers/account/account.controller';
import { MovementsService } from './services/movements/movements.service';
import { AccountService } from './services/account/account.service';

@Module({
  controllers: [AccountController],
  providers: [MovementsService, AccountService],
})
export class AccountModule {}
