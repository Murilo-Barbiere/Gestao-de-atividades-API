import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserUpdataDto {
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsNotEmpty()
    senha!: string;
    
    @IsEmail()
    email!: string;
}