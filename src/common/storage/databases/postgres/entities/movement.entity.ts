import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { AccountEntity } from './account.entity';
import { v4 as uuid } from 'uuid';
import { ApiProperty } from '@nestjs/swagger';

@Index(
  'movement_acc_id_income_acc_id_outcome_Idx',
  ['accIdIncome', 'accIdOutcome'],
  {},
)
@Index('pkmovement', ['id'], { unique: true })
@Entity('movement', { schema: 'public' })
export class MovementEntity {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'Unique identificator of the Movement',
  })
  @Column('uuid', { primary: true, name: 'mov_id' })
  id: string = uuid();

  @ApiProperty({
    example: '123e8400-e29b-41d4-a716-446655445555',
    description: 'Unique identificator of the Account where the founds entered',
  })
  @Column('uuid', { name: 'acc_id_income' })
  accIdIncome: string;

  @ApiProperty({
    example: '123e8400-e29b-41d4-a716-446655445555',
    description:
      'Unique identificator of the Account where the founds came out',
  })
  @Column('uuid', { name: 'acc_id_outcome' })
  accIdOutcome: string;

  @ApiProperty({
    example: 'New Car',
    description: 'The reason for made a Loan',
  })
  @Column('character varying', { name: 'mov_reason', length: 500 })
  reason: string;

  @ApiProperty({
    example: 2000,
    description: 'Ammount of the Loan',
  })
  @Column('bigint', {
    name: 'mov_amount',
    transformer: {
      to: (value) => value,
      from: (value) => parseInt(value),
    },
  })
  amount: number;

  @ApiProperty({
    example: 60,
    description:
      'Fees of the movement loans for default has 60 fees payments 1',
  })
  @Column('integer', { name: 'mov_fees', default: () => '1' })
  fees: number;

  @ApiProperty({
    example: '2022-12-08T20:18:58.728Z',
    description: 'time stamp whit the date time of movement',
  })
  @Column('timestamp without time zone', {
    name: 'mov_datetime',
    default: () => 'now()',
  })
  dateTime: Date;

  @ManyToOne(() => AccountEntity, (account) => account.movements, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'acc_id_income', referencedColumnName: 'id' }])
  accIdIncome2: AccountEntity;

  @ManyToOne(() => AccountEntity, (account) => account.movements2, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'acc_id_outcome', referencedColumnName: 'id' }])
  accIdOutcome2: AccountEntity;
}
