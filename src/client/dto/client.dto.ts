import { IsUUID, IsString, IsEmail } from 'class-validator';
export class ClientDto {
  @IsUUID()
  id: string;

  @IsString()
  fullName: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsString()
  photo: string;

  @IsString()
  appColor: string;
}
