import { IsNotEmpty, IsString } from 'class-validator';

export class CreateListaTarefaDto {
    @IsNotEmpty()
    @IsString()
    nome!: string;
}

