import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovementEntity } from '../../../common/storage/databases/postgres/entities/movement.entity';
import { PaymentDto } from '../../dto/paymnet.dto';
import { LoanDto } from '../../dto/loan.dto';

@Injectable()
export class MovementsService {
  constructor(
    @InjectRepository(MovementEntity)
    private readonly repository: Repository<MovementEntity>,
  ) {}
  addPayment(dto: PaymentDto) {
    const movement = new MovementEntity();
    movement.accIdIncome = dto.idIncome;
    movement.accIdOutcome = dto.idOutcome;
    movement.reason = dto.reason;
    movement.amount = dto.amount;
    movement.fees = 1;
    return this.repository.save(movement);
  }
  addLoan(dto: LoanDto) {
    const movement = new MovementEntity();
    movement.accIdIncome = dto.idIncome;
    movement.accIdOutcome = dto.idIncome;
    movement.reason = 'Loan';
    movement.amount = dto.amount;
    movement.fees = 60;
    return this.repository.save(movement);
  }
  async getMovments(accId: string): Promise<MovementEntity[]> {
    const movements: MovementEntity[] = await this.repository.find({
      where: [{ accIdIncome: accId }, { accIdOutcome: accId }],
    });
    return movements;
  }
}
