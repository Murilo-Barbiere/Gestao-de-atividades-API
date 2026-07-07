import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProjetoDto {
    @IsNotEmpty()
    @IsString()
    nome!: string;
}

