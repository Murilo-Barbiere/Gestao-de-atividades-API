import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserDto{
    @IsNotEmpty()
    id!: number;

    @IsNotEmpty()
    @IsString()
    name!: string
    
    @IsEmail()
    @IsNotEmpty()
    @IsString()
    email!: string;
}