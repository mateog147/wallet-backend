import { Module } from '@nestjs/common';
import { ClientModule } from './client/client.module';
import { AccountModule } from './account/account.module';
import { CommonModule } from './common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { AccountEntity } from './common/storage/databases/postgres/entities/account.entity';
import { AppEntity } from './common/storage/databases/postgres/entities/app.entity';
import { ClientEntity } from './common/storage/databases/postgres/entities/client.entity';
import { MovementEntity } from './common/storage/databases/postgres/entities/movement.entity';

@Module({
  imports: [
    ClientModule,
    AccountModule,
    CommonModule,
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
  ],
})
export class MainModule {}
