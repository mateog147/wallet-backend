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

@Index('pkaccount', ['id'], { unique: true })
@Index('account_cli_id_Idx', ['cliId'], { unique: true })
@Entity('account', { schema: 'public' })
export class AccountEntity {
  @Column('uuid', { primary: true, name: 'acc_id' })
  id: string = uuid();

  @Column('uuid', { name: 'cli_id' })
  cliId: string;

  @Column('bigint', { name: 'acc_balance', default: () => '0' })
  balance: string;

  @Column('bigint', { name: 'acc_credit', default: () => '50000000' })
  credit: string;

  @Column('integer', { name: 'acc_state', default: () => '1' })
  state: number;

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
