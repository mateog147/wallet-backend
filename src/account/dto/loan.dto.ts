import { IsNotEmpty, IsPositive, IsString, IsUUID } from 'class-validator';

export class LoanDto {
  @IsNotEmpty()
  @IsUUID()
  idIncome: string;

  @IsNotEmpty()
  @IsPositive()
  amount: number;

  @IsNotEmpty()
  @IsString()
  reason: string;
}
