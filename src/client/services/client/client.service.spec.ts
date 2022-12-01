import { Test, TestingModule } from '@nestjs/testing';
import { ClientService } from './client.service';

describe('ClientService', () => {
  let service: ClientService;

  beforeEach(async () => {
    const data = {
      id: '1ddc64c0-56c0-40e0-83ee-16da62a4042f',
      fullName: 'New Client',
      email: 'client.new@mail.com',
      phone: '3216549870',
      photo:
        'https://s.gravatar.com/avatar/875605e74d1bad33faa12f1e7ae1b155?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fnc.png',
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientService],
    }).compile();

    service = module.get<ClientService>(ClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new client into the database', () => {
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
    const result = service.create(dto);

    //Assert
    expect(result).resolves.toEqual(expected);
  });

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
