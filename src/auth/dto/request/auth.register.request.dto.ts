import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthRegiterRequestDto {
  @IsString()
  @IsNotEmpty()
  readonly nome!: string;

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  readonly email!: string;

  @IsString()
  @IsNotEmpty()
  readonly senha!: string;
}
