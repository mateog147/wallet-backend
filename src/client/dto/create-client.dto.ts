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
  fullName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsAlphanumeric()
  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  @IsUrl()
  photo: string;
}
