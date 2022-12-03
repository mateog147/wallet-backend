import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UpdateColorDto {
  @IsNotEmpty()
  @IsUUID()
  cliId: string;

  @IsNotEmpty()
  @IsString()
  color: string;
}
