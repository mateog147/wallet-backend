import { SwaggerDocumentOptions } from '@nestjs/swagger';
import { AccountEntity } from '../storage/databases/postgres/entities/account.entity';
import { AppEntity } from '../storage/databases/postgres/entities/app.entity';
import { ClientEntity } from '../storage/databases/postgres/entities/client.entity';
import { MovementEntity } from '../storage/databases/postgres/entities/movement.entity';

export const optionsCreateDocument: SwaggerDocumentOptions = {
  extraModels: [AppEntity, AccountEntity, ClientEntity, MovementEntity],
};
