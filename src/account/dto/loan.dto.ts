import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive, IsString, IsUUID } from 'class-validator';

export class LoanDto {
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'Unique identificator of the Account',
  })
  idIncome: string;

  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({
    example: 2000,
    description: 'Ammount of the Loan',
  })
  amount: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'New Car',
    description: 'The reason for made a Loan',
  })
  reason: string;
}
