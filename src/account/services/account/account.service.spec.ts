import { Test, TestingModule } from '@nestjs/testing';
import { AccountService } from './account.service';
import { AccountEntity } from '../../../common/storage/databases/postgres/entities/account.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MovementsService } from '../movements/movements.service';
import { AccountDto } from '../../dto/account.to';
import { ClientEntity } from '../../../common/storage/databases/postgres/entities/client.entity';
import { MovementEntity } from '../../../common/storage/databases/postgres/entities/movement.entity';

describe('AccountService', () => {
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

  const returnedAccount: AccountEntity = {
    balance: 123000000,
    credit: 50000000,
    id: 'b146b149-bd56-4877-a518-5abbdac01557',
    cliId: 'f3689626-8b1d-439c-9696-5bcad7e5fe75',
    movements: [],
    state: 0,
    accCreatedAt: undefined,
    accUpdatedAt: undefined,
    accDeletedAt: undefined,
    cli: new ClientEntity(),
    movements2: [],
  };

  const movements: MovementEntity[] = [
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
  ];

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
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountService,
        {
          provide: getRepositoryToken(AccountEntity),
          useValue: {
            save: jest.fn(),
            findOneOrFail: jest.fn().mockResolvedValue(returnedAccount),
          },
        },
        {
          provide: MovementsService,
          useValue: {
            getMovments: jest.fn().mockResolvedValue(movements),
            addLoan: jest.fn().mockResolvedValue(expectedLoan),
            addPayment: jest.fn().mockResolvedValue(expectedPayment),
          },
        },
      ],
    }).compile();

    service = module.get<AccountService>(AccountService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return account balance and the last movements of client by the id', async () => {
    //Arrange
    const id = 'f3689626-8b1d-439c-9696-5bcad7e5fe75';

    //Act
    const result: AccountDto = await service.getAccountInfo(id);
    //Assert
    expect(result).toEqual(expectedAccountDto);
  });

  it('should add to balance and substract from the credit of a account due to a Loan', async () => {
    //Arrange
    const dto = {
      idIncome: '1ddc64c0-56c0-40e0-83ee-16da62a4042f',
      amount: 60,
    };
    //Act
    const result = await service.newLoan(dto);
    //Assert
    expect(result).toEqual(expectedLoan);
  });

  it('should edit de balance of the account involved in a Payment', async () => {
    //Arrange
    const dto = {
      idIncome: '1',
      idOutcome: 'f3689626-8b1d-439c-9696-5bcad7e5fe75',
      reason: 'Payment',
      amount: 10,
    };

    //Act
    const result = await service.newPayment(dto);
    //Assert
    expect(result).toEqual(expectedPayment);
  });
});
