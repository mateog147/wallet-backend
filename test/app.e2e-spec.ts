import { ClientTokenGuard } from './../src/common/guards/client-token.guard';
import { Test, TestingModule } from '@nestjs/testing';
import { CanActivate, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { MainModule } from '../src/main.module';
import { ClientDto } from '../src/client/dto/client.dto';
import { CreateClientDto } from '../src/client/dto/create-client.dto';
import { ClientEntity } from '../src/common/storage/databases/postgres/entities/client.entity';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const mockTokenGuard: CanActivate = { canActivate: jest.fn(() => true) };
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [MainModule],
    })
      .overrideGuard(ClientTokenGuard)
      .useValue(mockTokenGuard)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/api/v1/client/ (GET)', () => {
    const expected: ClientDto = {
      id: '017e8632-3b80-4b20-9368-5346b8363724',
      fullName: 'Second Client',
      email: 'client.other@mail.com',
      phone: '3216549871',
      photo:
        'https://s.gravatar.com/avatar/875605e74d1bad33faa12f1e7ae1b155?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fju.png',
      appColor: '#1554F6',
    };
    return request(app.getHttpServer())
      .get('/api/v1/client/client.other@mail.com')
      .expect(200)
      .expect(expected);
  });

  it('/api/v1/client/ (POST)', () => {
    const rdm = Math.floor(1000000 + Math.random() * 900000);
    const rdmText = rdm.toString();
    const phone = `31${rdmText}`;
    const email = `e2e.${rdmText}@mail.com`;
    const dto: CreateClientDto = {
      fullName: 'End To End CLient',
      email: email,
      phone: phone,
      photo:
        'https://s.gravatar.com/avatar/875605e74d1bad33faa12f1e7ae1b155?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fee.png',
    };
    return request(app.getHttpServer())
      .post('/api/v1/client')
      .set('Accept', 'application/json')
      .send(dto)
      .expect(201)
      .expect((res: request.Response) => {
        const {
          id,
          fullName,
          email,
          phone,
          photo,
          state,
          cliCreatedAt,
          cliUpdatedAt,
          cliDeletedAt,
          account,
          app,
        } = res.body;
        expect(typeof id).toBe('string');
        expect(fullName).toEqual(dto.fullName);
        expect(email).toEqual(dto.email);
        expect(phone).toEqual(dto.phone);
        expect(photo).toEqual(dto.photo);
        expect(state).toEqual(1);
      });
  });
});
