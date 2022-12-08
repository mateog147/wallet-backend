import { Module } from '@nestjs/common';
import { ClientModule } from './client/client.module';
import { AccountModule } from './account/account.module';
import { CommonModule } from './common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { AccountEntity } from './common/storage/databases/postgres/entities/account.entity';
import { AppEntity } from './common/storage/databases/postgres/entities/app.entity';
import { ClientEntity } from './common/storage/databases/postgres/entities/client.entity';
import { MovementEntity } from './common/storage/databases/postgres/entities/movement.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DATABASE_HOST'),
        port: config.get<number>('DATABASE_PORT'),
        username: config.get<string>('DATABASE_USER'),
        password: config.get<string>('DATABASE_PASSWORD'),
        database: 'postgres',
        entities: [ClientEntity, AppEntity, AccountEntity, MovementEntity],
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
    ClientModule,
    AccountModule,
    CommonModule,
  ],
})
export class MainModule {}
