import { Test, TestingModule } from '@nestjs/testing';
import { MovementsService } from './movements.service';
import { MovementEntity } from '../../../common/storage/databases/postgres/entities/movement.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AccountEntity } from '../../../common/storage/databases/postgres/entities/account.entity';
import { PaymentDto } from '../../dto/paymnet.dto';
import { LoanDto } from '../../dto/loan.dto';

describe('MovementsService', () => {
  let service: MovementsService;
  let repository: Repository<MovementEntity>;

  const expected = [
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
  ];

  const movementExpected: MovementEntity = {
    id: '1',
    accIdIncome: '1',
    accIdOutcome: '2',
    reason: 'test',
    amount: 1,
    fees: 1,
    dateTime: undefined,
    accIdIncome2: new AccountEntity(),
    accIdOutcome2: new AccountEntity(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MovementsService,
        {
          provide: getRepositoryToken(MovementEntity),
          useValue: {
            find: jest.fn().mockResolvedValue(expected),
            save: jest.fn().mockResolvedValue(movementExpected),
          },
        },
      ],
    }).compile();

    service = module.get<MovementsService>(MovementsService);
    repository = module.get<Repository<MovementEntity>>(
      getRepositoryToken(MovementEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  it('should return last movements of an account by the id', async () => {
    //Arrange
    const accId = 'b146b149-bd56-4877-a518-5abbdac01557';
    //Act
    const result = await service.getMovments(accId);
    //Assert
    expect(result).toEqual(expected);
  });

  it('should create a new movement corresponding to a Loan', async () => {
    //Arrange
    const dto: LoanDto = {
      idIncome: '1ddc64c0-56c0-40e0-83ee-16da62a4042f',
      amount: 10,
    };

    //Act
    const result = service.addLoan(dto);
    //Assert
    expect(result).resolves.toEqual(movementExpected);
  });

  it('should create a new movment corresponding to a Payment', async () => {
    //Arrange
    const dto: PaymentDto = {
      idIncome: '1ddc64c0-56c0-40e0-83ee-16da62a4042f',
      idOutcome: 'f3689626-8b1d-439c-9696-5bcad7e5fe75',
      reason: 'Payment',
      amount: 10,
    };
    //Act
    const result = service.addPayment(dto);
    //Assert
    expect(result).resolves.toEqual(movementExpected);
  });
});
