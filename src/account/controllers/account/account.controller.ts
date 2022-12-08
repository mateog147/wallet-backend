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

@Controller('api/v1/account')
export class AccountController {
  constructor(private service: AccountService) {}
  @Get(':id')
  async getFactura(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<AccountEntity> {
    const account = await this.service.getAccountInfo(id);
    if (account) {
      return account;
    }
    throw new HttpException('id not found', HttpStatus.NOT_FOUND);
  }

  @Post()
  //@UseGuards(TokenGuard)
  createFactura(@Body() loan: LoanDto): Promise<MovementEntity> {
    return this.service.newLoan(loan);
  }
}
