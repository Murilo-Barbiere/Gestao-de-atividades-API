import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthLoginRequestDto{
    @IsEmail()
    @IsNotEmpty()
    @IsString()
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    readonly senha: string;
}