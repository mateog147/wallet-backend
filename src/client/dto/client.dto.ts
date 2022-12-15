import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsString, IsEmail } from 'class-validator';
export class ClientDto {
  @IsUUID()
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'Unique identificator of the client',
  })
  id: string;

  @IsString()
  @ApiProperty({
    example: 'Pedro Perez Peña',
    description: 'Client full name',
  })
  fullName: string;

  @IsEmail()
  @ApiProperty({
    example: 'pedro@mail.com',
    description: 'Client email',
  })
  email: string;

  @IsString()
  @ApiProperty({
    example: '3214565987',
    description: 'Client phone number',
  })
  phone: string;

  @IsString()
  @ApiProperty({
    example:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png',
    description: 'URL of the client photo',
  })
  photo: string;

  @IsString()
  @ApiProperty({
    example: '#ffc0cb',
    description: 'string with the hexadecimal of the app color',
  })
  appColor: string;
}
