import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsUrl,
  IsAlphanumeric,
} from 'class-validator';

export class CreateClientDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Pedro Perez Peña',
    description: 'Client full name',
  })
  fullName: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    example: 'pedro@mail.com',
    description: 'Client email',
  })
  email: string;

  @IsAlphanumeric()
  @IsNotEmpty()
  @ApiProperty({
    example: '3214565987',
    description: 'Client phone number',
  })
  phone: string;

  @IsNotEmpty()
  @IsUrl()
  @ApiProperty({
    example:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png',
    description: 'URL of the client photo',
  })
  photo: string;
}
