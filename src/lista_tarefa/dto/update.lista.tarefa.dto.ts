import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateListaTarefaDto {
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    nome?: string;
}
