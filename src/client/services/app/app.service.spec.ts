import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = module.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should update the color related toa client Id', () => {
    //Arrange
    const dto = {
      cliId: '8fd1a8e3-5147-473f-840f-62981b808a0c',
      color: '#ff0000',
    };
    //Act
    const result = service.updateColor(dto);
    //Assert
    expect(result).resolves.toEqual(dto);
  });
});
