import { Column, Entity, Index, OneToOne } from 'typeorm';
import { AccountEntity } from './account.entity';
import { AppEntity } from './app.entity';
import { v4 as uuid } from 'uuid';
import { ApiProperty } from '@nestjs/swagger';

@Index('client_cli_email_Idx', ['email'], { unique: true })
@Index('pkclient', ['id'], { unique: true })
@Index('client_cli_phone_Idx', ['phone'], { unique: true })
@Entity('client', { schema: 'public' })
export class ClientEntity {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'Unique identificator of the client',
  })
  @Column('uuid', { primary: true, name: 'cli_id' })
  id: string = uuid();

  @ApiProperty({
    example: 'Pedro Perez Peña',
    description: 'Client full name',
  })
  @Column('character varying', { name: 'cli_full_name', length: 500 })
  fullName: string;

  @ApiProperty({
    example: 'pedro@mail.com',
    description: 'Client email',
  })
  @Column('character varying', { name: 'cli_email', length: 500 })
  email: string;

  @ApiProperty({
    example: '3214565987',
    description: 'Client phone number',
  })
  @Column('character varying', { name: 'cli_phone', length: 500 })
  phone: string;

  @ApiProperty({
    example:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png',
    description: 'URL of the client photo',
  })
  @Column('character varying', { name: 'cli_photo', length: 500 })
  photo: string;

  @ApiProperty({
    example: 1,
    description: 'number that represent the state of the client',
  })
  @Column('integer', { name: 'cli_state', default: () => '1' })
  state: number;

  @ApiProperty({
    example: '2022-12-08T20:18:58.728Z',
    description: 'time stamp whit the date time of client creation',
  })
  @Column('timestamp without time zone', {
    name: 'cli_created_at',
    default: () => 'now()',
  })
  cliCreatedAt: Date;

  @Column('timestamp without time zone', {
    name: 'cli_updated_at',
    nullable: true,
  })
  cliUpdatedAt: Date | null;

  @Column('timestamp without time zone', {
    name: 'cli_deleted_at',
    nullable: true,
  })
  cliDeletedAt: Date | null;

  @OneToOne(() => AccountEntity, (account) => account.cli, {
    cascade: ['insert'],
  })
  account: AccountEntity;

  @OneToOne(() => AppEntity, (app) => app.cli, {
    cascade: ['insert'],
  })
  app: AppEntity;
}
