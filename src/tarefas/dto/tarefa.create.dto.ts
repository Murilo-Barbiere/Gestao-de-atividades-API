import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { PrioridadeTarefa } from "src/common/enums/prioridade_Tarefa.enum";

export class TarefaCreateDto{
    @IsString()
    @IsNotEmpty()
    titulo!: string;

    @IsNumber()
    @IsNotEmpty()
    idList!: number;

    @IsEnum(PrioridadeTarefa, {message:"Valores permitidos: URGENTE, ALTA, MEDIA, BAIXA"})
    @IsNotEmpty()
    prioridadeTarefa!: PrioridadeTarefa;
}