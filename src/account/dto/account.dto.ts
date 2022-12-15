import { ApiProperty } from '@nestjs/swagger';
import { MovementEntity } from '../../common/storage/databases/postgres/entities/movement.entity';
export class AccountDto {
  @ApiProperty({
    example: '430e8400-e29b-41d4-a716-c651186dcff7',
    description: 'Unique identificator of the Account',
  })
  id: string;
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'Unique identificator of the client',
  })
  cliId: string;
  @ApiProperty({
    example: 1000,
    description: 'Account balance',
  })
  balance: number;
  @ApiProperty({
    example: 2000,
    description: 'Account available credit',
  })
  credit: number;
  @ApiProperty({
    example: [
      {
        id: 'fc50f37c-8f93-4323-9ac1-5d98bd0b9aad',
        accIdIncome: 'f2249e8a-5ec4-47a1-889d-c651186dcff7',
        accIdOutcome: 'f4312ae6-6fb4-4d80-91ff-9cc8abb4ec23',
        reason: 'Payment test',
        amount: 10,
        fees: 1,
        dateTime: '2022-12-08T20:18:58.728Z',
      },
    ],
    description: 'Account related Movements',
  })
  movements: MovementEntity[];
}
