import { IsNotEmpty, IsPositive, IsUUID } from 'class-validator';

export class LoanDto {
  @IsNotEmpty()
  @IsUUID()
  idIncome: string;

  @IsNotEmpty()
  @IsPositive()
  amount: number;
}
