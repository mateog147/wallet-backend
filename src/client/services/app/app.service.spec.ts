import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { Repository } from 'typeorm';
import { AppEntity } from '../../../common/storage/databases/postgres/entities/app.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UpdateColorDto } from '../../dto/update-color.dto';

describe('AppService', () => {
  let service: AppService;
  let repository: Repository<AppEntity>;

  beforeEach(async () => {
    const expected = new AppEntity();
    expected.cliId = '1ddc64c0-56c0-40e0-83ee-16da62a4042f';
    expected.color = '#1554F6';
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
        {
          provide: getRepositoryToken(AppEntity),
          useValue: {
            findOne: jest.fn().mockResolvedValue(expected),
            update: jest.fn((data) => data),
          },
        },
      ],
    }).compile();

    service = module.get<AppService>(AppService);
    repository = module.get<Repository<AppEntity>>(
      getRepositoryToken(AppEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('return value', () => {
    it('should return the app color by a client id', () => {
      //Arrange
      const cliId = '1ddc64c0-56c0-40e0-83ee-16da62a4042f';
      //Act
      const result = service.getColor(cliId);
      console.log('result', result);
      //Assert
      expect(result).resolves.toEqual('#1554F6');
    });
  });

  it('should update the color related toa client Id', () => {
    //Arrange
    const dto: UpdateColorDto = {
      cliId: '8fd1a8e3-5147-473f-840f-62981b808a0c',
      color: '#ff0000',
    };
    //Act
    const result = service.updateColor(dto);
    //Assert
    expect(result).resolves.toEqual(dto);
  });
});
