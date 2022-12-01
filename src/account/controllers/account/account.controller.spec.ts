import { TokenGuard } from './../../../common/guards/token.guard';
import { CanActivate } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AccountController } from './account.controller';
import { AccountService } from '../../services/account/account.service';

describe('AccountController', () => {
  let controller: AccountController;
  let service: AccountService;
  beforeEach(async () => {
    const mockTokenGuard: CanActivate = { canActivate: jest.fn(() => true) };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountController],
      providers: [
        AccountService,
        {
          provide: AccountService,
          useValue: {},
        },
      ],
    })
      .overrideGuard(TokenGuard)
      .useValue(mockTokenGuard)
      .compile();

    controller = module.get<AccountController>(AccountController);
    service = module.get<AccountService>(AccountService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  it('should return account balance and the last movements of client', async () => {
    //Arrange
    const id = 'f3689626-8b1d-439c-9696-5bcad7e5fe75';
    const expected = {
      balance: 123000000,
      credit: 50000000,
      id: 'b146b149-bd56-4877-a518-5abbdac01557',
      cliId: 'f3689626-8b1d-439c-9696-5bcad7e5fe75',
      movements: [
        {
          id: 'b146b149-bd56-4877-a518-5abbdac01557',
          idIncome: 'f3689626-8b1d-439c-9696-5bcad7e5fe75',
          idOutcome: '1ddc64c0-56c0-40e0-83ee-16da62a4042f',
          reason: 'this is the reason',
          amount: 10000,
          fees: 1,
          dateTime: '22/06/2022 13:55',
        },
        {
          id: '8fd1a8e3-5147-473f-840f-62981b808a0c',
          idIncome: '1ddc64c0-56c0-40e0-83ee-16da62a4042f',
          idOutcome: 'f3689626-8b1d-439c-9696-5bcad7e5fe75',
          reason: 'this is other reason',
          amount: 10000,
          fees: 1,
          dateTime: '22/10/2022 13:55',
        },
      ],
    };
    //Act
    const result = await controller.getAccount(id);
    //Assert
    expect(service.getAccountInfo(id)).toHaveBeenCalled();
    expect(result).toEqual(expected);
  });

  it('should process de Loan requirement and return the movement', async () => {
    //Arrange
    const dto = {
      idIncome: '1ddc64c0-56c0-40e0-83ee-16da62a4042f',
      amount: 10,
    };
    const expected = {
      id: 'b146b149-bd56-4877-a518-5abbdac01557',
      idIncome: '1ddc64c0-56c0-40e0-83ee-16da62a4042f',
      idOutcome: '1ddc64c0-56c0-40e0-83ee-16da62a4042f',
      reason: 'Loan',
      amount: 10,
      fees: 60,
      dateTime: '22/06/2022 13:55',
    };
    //Act
    const result = await controller.loan(dto);
    //Assert
    expect(service.newLoan(dto)).toHaveBeenCalled();
    expect(result).toEqual(expected);
  });

  it('should process a payment and return the new movement', async () => {
    //Arrange
    const dto = {
      emailIncome: 'income@mail.com',
      idOutcome: 'f3689626-8b1d-439c-9696-5bcad7e5fe75',
      reason: 'Payment',
      amount: 10,
    };
    const expected = {
      id: 'b146b149-bd56-4877-a518-5abbdac01557',
      idIncome: '1ddc64c0-56c0-40e0-83ee-16da62a4042f',
      idOutcome: 'f3689626-8b1d-439c-9696-5bcad7e5fe75',
      reason: 'Payment',
      amount: 10,
      fees: 1,
      dateTime: '22/06/2022 13:55',
    };

    //Act
    const result = await service.payment(dto);
    //Assert
    expect(service.newPayment(dto)).toHaveBeenCalled();
    expect(result).toEqual(expected);
  });
});
