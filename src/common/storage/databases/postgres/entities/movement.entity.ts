import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { AccountEntity } from './account.entity';
import { v4 as uuid } from 'uuid';

@Index(
  'movement_acc_id_income_acc_id_outcome_Idx',
  ['accIdIncome', 'accIdOutcome'],
  {},
)
@Index('pkmovement', ['id'], { unique: true })
@Entity('movement', { schema: 'public' })
export class MovementEntity {
  @Column('uuid', { primary: true, name: 'mov_id' })
  id: string = uuid();

  @Column('uuid', { name: 'acc_id_income' })
  accIdIncome: string;

  @Column('uuid', { name: 'acc_id_outcome' })
  accIdOutcome: string;

  @Column('character varying', { name: 'mov_reason', length: 500 })
  reason: string;

  @Column('bigint', { name: 'mov_amount' })
  amount: number;

  @Column('integer', { name: 'mov_fees', default: () => '1' })
  fees: number;

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
