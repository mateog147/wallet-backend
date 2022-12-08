import { CanActivate } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ClientService } from '../../services/client/client.service';
import { TokenGuard } from '../../../common/guards/token.guard';
import { ClientController } from './client.controller';

describe('ClientController', () => {
  let controller: ClientController;
  let service: ClientService;
  beforeEach(async () => {
    const mockTokenGuard: CanActivate = { canActivate: jest.fn(() => true) };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientController],
      providers: [
        ClientService,
        {
          provide: ClientService,
          useValue: {
            create: jest.fn((data) => {
              return Promise.resolve({
                ...data,
                id: '1ddc64c0-56c0-40e0-83ee-16da62a4042f',
              });
            }),
            findByEmail: jest.fn().mockResolvedValue({
              id: '1ddc64c0-56c0-40e0-83ee-16da62a4042f',
              fullName: 'New Client',
              email: 'client.new@mail.com',
              phone: '3216549870',
              photo:
                'https://s.gravatar.com/avatar/875605e74d1bad33faa12f1e7ae1b155?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fnc.png',
              appColor: '#1554F6',
            }),
          },
        },
      ],
    })
      .overrideGuard(TokenGuard)
      .useValue(mockTokenGuard)
      .compile();

    controller = module.get<ClientController>(ClientController);
    service = module.get<ClientService>(ClientService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  it('should create a new', () => {
    //Arrange
    const dto = {
      fullName: 'New Client',
      email: 'client.new@mail.com',
      phone: '3216549870',
      photo:
        'https://s.gravatar.com/avatar/875605e74d1bad33faa12f1e7ae1b155?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fnc.png',
    };

    const expected = {
      id: '1ddc64c0-56c0-40e0-83ee-16da62a4042f',
      ...dto,
    };
    //Act
    const result = controller.newClient(dto);

    //Assert
    expect(result).resolves.toEqual(expected);
  });

  it('should return the client info', () => {
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
    const result = controller.getClientData(email);

    //Assert
    expect(result).resolves.toEqual(expected);
  });
});
