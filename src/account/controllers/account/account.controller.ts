import { ClientTokenGuard } from './../../../common/guards/client-token.guard';
import { AccountService } from './../../services/account/account.service';
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ParseUUIDPipe } from '@nestjs/common/pipes';
import { LoanDto } from '../../dto/loan.dto';
import { MovementEntity } from '../../../common/storage/databases/postgres/entities/movement.entity';
import { PaymentDto } from '../../dto/paymnet.dto';
import { EmailPaymentDto } from '../../dto/email-payment.dto';
import { ClientService } from '../../../client/services/client/client.service';
import { AccountDto } from '../../dto/account.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('api/v1')
@ApiTags('Account')
@UseGuards(ClientTokenGuard)
export class AccountController {
  constructor(
    private service: AccountService,
    private clientService: ClientService,
  ) {}
  @Get('/account/:id')
  @ApiOperation({
    summary: 'Returns the Account related to a client Id',
    description: 'GET Account.',
  })
  @ApiResponse({
    status: 200,
    description: 'Account',
    type: AccountDto,
  })
  @ApiResponse({
    status: 403,
    description: 'Bad request, review the token',
  })
  @ApiResponse({
    status: 400,
    description: 'Be sure that the Account  already exists on the data base',
  })
  @ApiBearerAuth('access-token')
  async getAccount(
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
  @ApiOperation({
    summary: 'Create a Movement of a Loan',
    description: 'New Loan.',
  })
  @ApiBody({
    type: LoanDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Movement created',
    type: MovementEntity,
  })
  @ApiResponse({
    status: 403,
    description: 'Bad request, review the token',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request, review all the params',
  })
  @ApiBearerAuth('access-token')
  createLoan(@Body() loan: LoanDto): Promise<MovementEntity> {
    return this.service.newLoan(loan);
  }

  @Post('payment')
  @ApiOperation({
    summary: 'Create a Movement of a Payment',
    description: 'New Payment.',
  })
  @ApiBody({
    type: EmailPaymentDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Movement created',
    type: MovementEntity,
  })
  @ApiResponse({
    status: 403,
    description: 'Bad request, review the token',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request, review all the params',
  })
  @ApiBearerAuth('access-token')
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
