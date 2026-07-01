import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthRegisterRequestDto {
  @IsString()
  @IsNotEmpty()
  readonly name!: string;

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  readonly email!: string;

  @IsString()
  @IsNotEmpty()
  readonly senha!: string;
}
