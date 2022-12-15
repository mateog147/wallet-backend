import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UpdateColorDto {
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'Unique identificator of the client',
  })
  cliId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '#ffc0cb',
    description: 'string with the hexadecimal of the app color',
  })
  color: string;
}
