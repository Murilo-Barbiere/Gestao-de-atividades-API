import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthLoginRequestDto {
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly email!: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly senha!: string;
}
