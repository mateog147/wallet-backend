import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { TokenGuard } from '../../../common/guards/token.guard';
import { CanActivate } from '@nestjs/common';
import { AppService } from '../../services/app/app.service';

describe('AppController', () => {
  let controller: AppController;
  let service: AppService;

  beforeEach(async () => {
    const mockTokenGuard: CanActivate = { canActivate: jest.fn(() => true) };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: AppService,
          useValue: {
            updateColor: jest.fn((data) => Promise.resolve(data)),
          },
        },
      ],
    })
      .overrideGuard(TokenGuard)
      .useValue(mockTokenGuard)
      .compile();

    controller = module.get<AppController>(AppController);
    service = module.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  it('should update the color related toa client Id', () => {
    //Arrange
    const dto = {
      cliId: '8fd1a8e3-5147-473f-840f-62981b808a0c',
      color: '#ff0000',
    };
    //Act
    const result = controller.updateThemeColor(dto);
    //Assert
    expect(result).resolves.toEqual(dto);
  });
});
