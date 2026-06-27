import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserUpdataDto {

    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsEmail()
    email!: string;

    @IsString()
    @IsNotEmpty()
    senha!: string;
}