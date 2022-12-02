import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ClientEntity } from '../../../common/storage/databases/postgres/entities/client.entity';
import { Repository } from 'typeorm';
import { ClientService } from './client.service';
import { CreateClientDto } from '../../dto/create-client.dto';
import { AccountEntity } from '../../../common/storage/databases/postgres/entities/account.entity';
import { AppEntity } from '../../../common/storage/databases/postgres/entities/app.entity';
import { AppService } from '../app/app.service';

describe('ClientService', () => {
  let service: ClientService;
  let repository: Repository<ClientEntity>;
  const mockAccount: AccountEntity = new AccountEntity();
  const mockApp: AppEntity = new AppEntity();
  const client1: ClientEntity = {
    id: '1ddc64c0-56c0-40e0-83ee-16da62a4042f',
    fullName: 'New Client',
    email: 'client.new@mail.com',
    phone: '3216549870',
    photo:
      'https://s.gravatar.com/avatar/875605e74d1bad33faa12f1e7ae1b155?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fnc.png',
    state: 0,
    cliCreatedAt: undefined,
    cliUpdatedAt: undefined,
    cliDeletedAt: undefined,
    account: new AccountEntity(),
    app: new AppEntity(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientService,
        {
          provide: AppService,
          useValue: {
            getColor: jest.fn().mockResolvedValue('#1554F6'),
          },
        },
        {
          provide: getRepositoryToken(ClientEntity),
          useValue: {
            save: jest.fn((data: ClientEntity): Promise<ClientEntity> => {
              if (data.email == 'client.new@mail.com') {
                return Promise.resolve({
                  ...data,
                  id: '1ddc64c0-56c0-40e0-83ee-16da62a4042f',
                  state: 0,
                  cliCreatedAt: undefined,
                  cliUpdatedAt: undefined,
                  cliDeletedAt: undefined,
                  account: mockAccount,
                  app: mockApp,
                });
              }
              return Promise.resolve({
                ...data,
                id: '70be134b-0d0c-4d49-8b84-ebc96ab25ac1',
                state: 0,
                cliCreatedAt: undefined,
                cliUpdatedAt: undefined,
                cliDeletedAt: undefined,
                account: mockAccount,
                app: mockApp,
              });
            }),
            findOne: jest.fn().mockResolvedValue(client1),
          },
        },
      ],
    }).compile();

    service = module.get<ClientService>(ClientService);
    repository = module.get<Repository<ClientEntity>>(
      getRepositoryToken(ClientEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('create a client', () => {
    it('should create a new client into the database', () => {
      //Arrange
      const dto: CreateClientDto = {
        fullName: 'New Client',
        email: 'client.new@mail.com',
        phone: '3216549870',
        photo:
          'https://s.gravatar.com/avatar/875605e74d1bad33faa12f1e7ae1b155?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fnc.png',
      };

      const expected: ClientEntity = {
        id: '1ddc64c0-56c0-40e0-83ee-16da62a4042f',
        ...dto,
        state: 0,
        cliCreatedAt: undefined,
        cliUpdatedAt: undefined,
        cliDeletedAt: undefined,
        account: mockAccount,
        app: mockApp,
      };
      //Act
      const result = service.create(dto);

      //Assert
      expect(result).resolves.toEqual(expected);
    });

    it('should create a another client into the database', () => {
      //Arrange
      const dto: CreateClientDto = {
        fullName: 'other Client',
        email: 'client.other@mail.com',
        phone: '3216549870',
        photo:
          'https://s.gravatar.com/avatar/875605e74d1bad33faa12f1e7ae1b155?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Foc.png',
      };

      const expected: ClientEntity = {
        id: '70be134b-0d0c-4d49-8b84-ebc96ab25ac1',
        ...dto,
        state: 0,
        cliCreatedAt: undefined,
        cliUpdatedAt: undefined,
        cliDeletedAt: undefined,
        account: mockAccount,
        app: mockApp,
      };
      //Act
      const result = service.create(dto);

      //Assert
      expect(result).resolves.toEqual(expected);
    });
  });

  describe('find a client by the email', () => {
    it('should return a client by the email property', () => {
      //Arrange
      const email = 'client.new@mail.com';
      const expected = {
        id: '1ddc64c0-56c0-40e0-83ee-16da62a4042f',
        fullName: 'New Client',
        email: 'client.new@mail.com',
        phone: '3216549870',
        photo:
          'https://s.gravatar.com/avatar/875605e74d1bad33faa12f1e7ae1b155?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fnc.png',
        appColor: '#1554F6',
      };
      //Act
      const result = service.findByEmail(email);

      //Assert
      expect(result).resolves.toEqual(expected);
    });
  });
});
