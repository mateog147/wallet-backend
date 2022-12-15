import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { ClientEntity } from './client.entity';
import { MovementEntity } from './movement.entity';
import { v4 as uuid } from 'uuid';
import { ApiProperty } from '@nestjs/swagger';

@Index('pkaccount', ['id'], { unique: true })
@Index('account_cli_id_Idx', ['cliId'], { unique: true })
@Entity('account', { schema: 'public' })
export class AccountEntity {
  @ApiProperty({
    example: '430e8400-e29b-41d4-a716-c651186dcff7',
    description: 'Unique identificator of the Account',
  })
  @Column('uuid', { primary: true, name: 'acc_id' })
  id: string = uuid();

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'Unique identificator of the client',
  })
  @Column('uuid', { name: 'cli_id' })
  cliId: string;

  @ApiProperty({
    example: 1000,
    description: 'Account balance',
  })
  @Column('bigint', {
    name: 'acc_balance',
    default: () => '0',
    transformer: {
      to: (value) => value,
      from: (value) => parseInt(value),
    },
  })
  balance: number;

  @ApiProperty({
    example: 2000,
    description: 'Account available credit',
  })
  @Column('bigint', {
    name: 'acc_credit',
    default: () => '50000000',
    transformer: {
      to: (value) => value,
      from: (value) => parseInt(value),
    },
  })
  credit: number;

  @ApiProperty({
    example: 1,
    description: 'number that represent the state of the Account',
  })
  @Column('integer', { name: 'acc_state', default: () => '1' })
  state: number;

  @ApiProperty({
    example: '2022-12-08T20:18:58.728Z',
    description: 'time stamp whit the date time of Account creation',
  })
  @Column('timestamp without time zone', {
    name: 'acc_created_at',
    default: () => 'now()',
  })
  accCreatedAt: Date;

  @Column('timestamp without time zone', {
    name: 'acc_updated_at',
    nullable: true,
  })
  accUpdatedAt: Date | null;

  @Column('timestamp without time zone', {
    name: 'acc_deleted_at',
    nullable: true,
  })
  accDeletedAt: Date | null;

  @OneToOne(() => ClientEntity, (client) => client.account, {
    cascade: ['insert'],
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'cli_id', referencedColumnName: 'id' }])
  cli: ClientEntity;

  @OneToMany(() => MovementEntity, (movement) => movement.accIdIncome2, {
    cascade: ['insert'],
  })
  movements: MovementEntity[];

  @OneToMany(() => MovementEntity, (movement) => movement.accIdOutcome2, {
    cascade: ['insert'],
  })
  movements2: MovementEntity[];
}
