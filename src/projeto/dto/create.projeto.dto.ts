import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProjetoDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    nome!: string;
}
