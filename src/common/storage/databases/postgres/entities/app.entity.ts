import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';
import { ClientEntity } from './client.entity';
import { v4 as uuid } from 'uuid';
import { ApiProperty } from '@nestjs/swagger';

@Index('pkapp', ['id'], { unique: true })
@Index('app_cli_id_Idx', ['cliId'], { unique: true })
@Entity('app', { schema: 'public' })
export class AppEntity {
  @ApiProperty({
    example: '430e8400-e29b-41d4-a716-c651186dcff7',
    description: 'Unique identificator of the App',
  })
  @Column('uuid', { primary: true, name: 'app_id' })
  id: string = uuid();

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'Unique identificator of the client',
  })
  @Column('uuid', { name: 'cli_id' })
  cliId: string;

  @ApiProperty({
    example: '#ffc0cb',
    description: 'string with the hexadecimal of the app color',
  })
  @Column('character varying', {
    name: 'app_color',
    length: 30,
    default: () => "'#1554F6'",
  })
  color = '#1554F6';

  @ApiProperty({
    example: '2022-12-08T20:18:58.728Z',
    description: 'time stamp whit the date time of app creation',
  })
  @Column('timestamp without time zone', {
    name: 'app_created_at',
    default: () => 'now()',
  })
  appCreatedAt: Date;

  @Column('timestamp without time zone', {
    name: 'app_updated_at',
    nullable: true,
  })
  appUpdatedAt: Date | null;

  @OneToOne(() => ClientEntity, (client) => client.app, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'cli_id', referencedColumnName: 'id' }])
  cli: ClientEntity;
}
