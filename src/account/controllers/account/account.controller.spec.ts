import { MovementEntity } from './../../../common/storage/databases/postgres/entities/movement.entity';
import { AccountDto } from './../../dto/account.to';
import { AccountEntity } from './../../../common/storage/databases/postgres/entities/account.entity';
import { ClientService } from './../../../client/services/client/client.service';
import { ClientTokenGuard } from '../../../common/guards/client-token.guard';
import { CanActivate } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AccountController } from './account.controller';
import { AccountService } from '../../services/account/account.service';
import { PaymentDto } from '../../dto/paymnet.dto';
import { EmailPaymentDto } from '../../dto/email-payment.dto';
import { LoanDto } from '../../dto/loan.dto';

describe('AccountController', () => {
  let controller: AccountController;
  let service: AccountService;

  const dateTime = new Date();
  const accIncome = new AccountEntity();
  const accOutcome = new AccountEntity();
  const expectedAccountDto: AccountDto = {
    balance: 123000000,
    credit: 50000000,
    id: 'b146b149-bd56-4877-a518-5abbdac01557',
    cliId: 'f3689626-8b1d-439c-9696-5bcad7e5fe75',
    movements: [
      {
        id: 'b146b149-bd56-4877-a518-5abbdac01401',
        accIdIncome: 'b146b149-bd56-4877-a518-5abbdac01557',
        accIdOutcome: '1ddc64c0-56c0-40e0-83ee-16da62a4042f',
        reason: 'this is the reason',
        amount: 10000,
        fees: 1,
        dateTime: dateTime,
        accIdIncome2: accIncome,
        accIdOutcome2: accOutcome,
      },
      {
        id: '8fd1a8e3-5147-473f-840f-62981b808a0c',
        accIdIncome: 'b146b149-bd56-4877-a518-5abbdac01557',
        accIdOutcome: 'b146b149-bd56-4877-a518-5abbdac01557',
        reason: 'this is other reason',
        amount: 10000,
        fees: 1,
        dateTime: dateTime,
        accIdIncome2: accIncome,
        accIdOutcome2: accOutcome,
      },
    ],
  };

  const paymentDto: PaymentDto = {
    idIncome: '',
    idOutcome: '',
    reason: '',
    amount: 0,
  };

  const expectedPayment: MovementEntity = {
    id: 'b146b149-bd56-4877-a518-5abbdac01401',
    accIdIncome: 'b146b149-bd56-4877-a518-5abbdac01557',
    accIdOutcome: '1ddc64c0-56c0-40e0-83ee-16da62a4042f',
    reason: 'this is the reason',
    amount: 10000,
    fees: 1,
    dateTime: dateTime,
    accIdIncome2: accIncome,
    accIdOutcome2: accOutcome,
  };

  const expectedLoan: MovementEntity = {
    id: 'b146b149-bd56-4877-a518-5abbdac01401',
    accIdIncome: 'b146b149-bd56-4877-a518-5abbdac01557',
    accIdOutcome: 'b146b149-bd56-4877-a518-5abbdac01557',
    reason: 'Loan',
    amount: 10000,
    fees: 60,
    dateTime: dateTime,
    accIdIncome2: accIncome,
    accIdOutcome2: accOutcome,
  };

  beforeEach(async () => {
    const mockTokenGuard: CanActivate = { canActivate: jest.fn(() => true) };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountController],
      providers: [
        {
          provide: AccountService,
          useValue: {
            getAccountInfo: jest.fn().mockResolvedValue(expectedAccountDto),
            newLoan: jest.fn().mockResolvedValue(expectedLoan),
            newPayment: jest.fn().mockResolvedValue(expectedPayment),
          },
        },
        {
          provide: ClientService,
          useValue: {
            findByEmail: jest.fn().mockResolvedValue(paymentDto),
          },
        },
      ],
    })
      .overrideGuard(ClientTokenGuard)
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
    //Act
    const result = await controller.getAccount(id);
    //Assert
    expect(result).toEqual(expectedAccountDto);
  });

  it('should process de Loan requirement and return the movement', async () => {
    //Arrange
    const dto: LoanDto = {
      idIncome: '1ddc64c0-56c0-40e0-83ee-16da62a4042f',
      amount: 10,
      reason: '',
    };
    //Act
    const result = await controller.createLoan(dto);
    //Assert
    expect(result).toEqual(expectedLoan);
  });

  it('should process a payment and return the new movement', async () => {
    //Arrange
    const dto: EmailPaymentDto = {
      emailIncome: '',
      idOutcome: '',
      reason: '',
      amount: 0,
    };
    //Act
    const result = await controller.createPayment(dto);
    //Assert
    expect(result).toEqual(expectedPayment);
  });
});
