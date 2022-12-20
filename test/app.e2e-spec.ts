import { ClientTokenGuard } from './../src/common/guards/client-token.guard';
import { Test, TestingModule } from '@nestjs/testing';
import { CanActivate, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { MainModule } from '../src/main.module';
import { ClientDto } from '../src/client/dto/client.dto';

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
});
