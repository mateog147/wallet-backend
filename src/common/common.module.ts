import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientEntity } from './storage/databases/postgres/entities/client.entity';
import { AppEntity } from './storage/databases/postgres/entities/app.entity';
import { AccountEntity } from './storage/databases/postgres/entities/account.entity';
import { MovementEntity } from './storage/databases/postgres/entities/movement.entity';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => ({
        type: 'postgres',
        host: '127.0.0.1',
        port: 5432,
        username: 'admin',
        password: 'admin',
        database: 'postgres',
        entities: [ClientEntity, AppEntity, AccountEntity, MovementEntity],
        synchronize: false,
      }),
    }),
    TypeOrmModule.forFeature([
      ClientEntity,
      AppEntity,
      AccountEntity,
      MovementEntity,
    ]),
  ],
})
export class CommonModule {}
