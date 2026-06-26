import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserDto{
    @IsNotEmpty()
    id: number;

    @IsString()
    @IsNotEmpty()
    readonly nome: string;

    @IsEmail()
    @IsString()
    @IsNotEmpty()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    readonly senha: string;
}