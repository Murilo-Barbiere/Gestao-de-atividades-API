import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserUpdataDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name!: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    senha!: string;
    
    @IsEmail()
    @ApiProperty()
    email!: string;
}