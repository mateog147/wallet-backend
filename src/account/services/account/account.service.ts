import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountDto } from '../../dto/account.dto';
import { Repository } from 'typeorm';
import { AccountEntity } from '../../../common/storage/databases/postgres/entities/account.entity';
import { LoanDto } from '../../dto/loan.dto';
import { PaymentDto } from '../../dto/paymnet.dto';
import { MovementsService } from '../movements/movements.service';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly repository: Repository<AccountEntity>,
    private readonly movementsService: MovementsService,
  ) {}
  async getAccountInfo(id: string): Promise<AccountDto> {
    const accountDto = new AccountDto();
    const account = await this.repository.findOneOrFail({
      where: { cliId: id },
      // relations: {
      //   movements: true,
      //   movements2: true,
      // },
    });
    const movements = await this.movementsService.getMovments(account.id);
    accountDto.id = account.id;
    accountDto.cliId = account.cliId;
    accountDto.balance = account.balance;
    accountDto.credit = account.credit;
    // accountDto.movements = [
    //   ...new Set([...account.movements, ...account.movements2]),
    // ];
    accountDto.movements = movements;
    return accountDto;
  }
  async newLoan(dto: LoanDto) {
    try {
      const account: AccountEntity = await this.repository.findOneOrFail({
        where: { id: dto.idIncome },
      });
      const movement = await this.movementsService.addLoan(dto);
      if (dto.amount > account.credit) {
        throw new Error('The ammount is bigger than the credit');
      }
      account.balance += dto.amount;
      account.credit -= dto.amount;
      this.repository.save(account);
      return movement;
    } catch (error) {
      throw new HttpException(
        'we have troubles adding the loan',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  async newPayment(dto: PaymentDto) {
    try {
      const accountIncome: AccountEntity = await this.repository.findOneOrFail({
        where: { id: dto.idIncome },
      });
      console.log('accountIncome :>> ', accountIncome);
      const accountOutcome: AccountEntity = await this.repository.findOneOrFail(
        {
          where: { id: dto.idOutcome },
        },
      );
      console.log('accountOutcome :>> ', accountOutcome);
      if (accountOutcome.balance < dto.amount) {
        throw new HttpException('Insuficent funds', HttpStatus.BAD_REQUEST);
      }
      const movement = await this.movementsService.addPayment(dto);
      accountIncome.balance += dto.amount;
      accountOutcome.balance -= dto.amount;
      this.repository.save([accountIncome, accountOutcome]);
      return movement;
    } catch (error) {
      throw new HttpException(
        'we have troubles adding the payment',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
