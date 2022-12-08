import {
  IsUUID,
  IsString,
  IsEmail,
  IsNotEmpty,
  IsPositive,
} from 'class-validator';
export class EmailPaymentDto {
  @IsEmail()
  @IsNotEmpty()
  emailIncome: string;

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
