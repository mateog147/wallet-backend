import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({
    example: 'user@email.com',
    description: 'Email of the user you want to send funds',
  })
  emailIncome: string;

  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description:
      'Unique identification of the Account where the funds will come out',
  })
  idOutcome: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'New Car',
    description: 'The reason for made a Reason',
  })
  reason: string;

  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({
    example: 2000,
    description: 'Ammount of the Payment',
  })
  amount: number;
}
