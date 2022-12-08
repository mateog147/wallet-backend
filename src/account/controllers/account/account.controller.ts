import { AccountService } from './../../services/account/account.service';
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ParseUUIDPipe } from '@nestjs/common/pipes';
import { AccountEntity } from '../../../common/storage/databases/postgres/entities/account.entity';
import { LoanDto } from '../../dto/loan.dto';
import { MovementEntity } from '../../../common/storage/databases/postgres/entities/movement.entity';
import { PaymentDto } from '../../dto/paymnet.dto';
import { EmailPaymentDto } from '../../dto/email-payment.dto';
import { ClientService } from '../../../client/services/client/client.service';
import { AccountDto } from '../../dto/account.to';

@Controller('api/v1')
export class AccountController {
  constructor(
    private service: AccountService,
    private clientService: ClientService,
  ) {}
  @Get('/account/:id')
  async getFactura(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<AccountDto> {
    try {
      const account = await this.service.getAccountInfo(id);
      return account;
    } catch (error) {
      throw new HttpException('id not found', HttpStatus.NOT_FOUND);
    }
  }

  @Post('loan')
  //@UseGuards(TokenGuard)
  createLoan(@Body() loan: LoanDto): Promise<MovementEntity> {
    return this.service.newLoan(loan);
  }

  @Post('payment')
  //@UseGuards(TokenGuard)
  async createPayment(@Body() dto: EmailPaymentDto): Promise<MovementEntity> {
    try {
      const cliIncome = await this.clientService.findByEmail(dto.emailIncome);
      const accIncome = await this.service.getAccountInfo(cliIncome.id);
      const payment: PaymentDto = {
        idIncome: accIncome.id,
        idOutcome: dto.idOutcome,
        reason: dto.reason,
        amount: dto.amount,
      };
      return this.service.newPayment(payment);
    } catch (error) {
      throw new HttpException(
        'We can`t complete your payment',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
