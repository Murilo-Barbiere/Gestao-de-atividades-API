import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateListaTarefaDto {
    @IsNotEmpty()
    @IsString()
    nome?: string;
}
