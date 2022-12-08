import { IsNotEmpty, IsString, IsUUID, IsPositive } from 'class-validator';

export class PaymentDto {
  @IsNotEmpty()
  @IsUUID()
  idIncome: string;

  @IsNotEmpty()
  @IsUUID()
  idOutcome: string;

  @IsNotEmpty()
  @IsString()
  reason: string;

  @IsNotEmpty()
  @IsPositive()
  amount: number;
}
