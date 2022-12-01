import { Module } from '@nestjs/common';
import { ClientModule } from './client/client.module';
import { AccountModule } from './account/account.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [ClientModule, AccountModule, CommonModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
