import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
  getAccountInfo(id: string): Promise<AccountEntity> {
    return this.repository.findOne({
      where: { cliId: id },
      relations: {
        movements: true,
        movements2: true,
      },
    });
  }
  async newLoan(dto: LoanDto) {
    try {
      const account: AccountEntity = await this.repository.findOneOrFail({
        where: { id: dto.idIncome },
      });
      const movement = await this.movementsService.addLoan(dto);
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
  newPayment(dto: PaymentDto) {
    throw new Error('Method not implemented.');
  }
}
