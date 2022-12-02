import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientEntity } from './storage/databases/postgres/entities/client.entity';
import { AppEntity } from './storage/databases/postgres/entities/app.entity';
import { AccountEntity } from './storage/databases/postgres/entities/account.entity';
import { MovementEntity } from './storage/databases/postgres/entities/movement.entity';
@Module({
  imports: [],
})
export class CommonModule {}
