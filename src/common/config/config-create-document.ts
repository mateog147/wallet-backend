import { DocumentBuilder } from '@nestjs/swagger';

export const configCreateDocument = new DocumentBuilder()
  .setTitle('Wallet API')
  .setDescription('API REST for Wallet MyApp')
  .setVersion('0.1')
  .addTag(
    'App',
    'Description of the APIs corresponding to the application management',
  )
  .addTag(
    'Account',
    'Description of the APIs corresponding to the account management',
  )
  .addTag(
    'Client',
    'Description of the APIs corresponding to the client management',
  )
  .addBearerAuth(
    { in: 'header', type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
    'access-token',
  )
  .build();
