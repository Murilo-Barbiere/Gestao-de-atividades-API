import { IsEnum, IsIn, IsOptional } from "class-validator";
import { PrioridadeTarefa } from "src/common/enums/prioridade_Tarefa.enum";
import { StatusFiltro } from "src/common/enums/status_filtro.enum";
import { TarefaOrdenacao } from "src/common/enums/tarefa_ordenacao.enum";

export class BuscarTarefasQueryDto {

    @IsOptional()
    @IsEnum(StatusFiltro)
    status?: StatusFiltro;

    @IsOptional()
    @IsEnum(TarefaOrdenacao)
    sort?: TarefaOrdenacao;

    @IsOptional()
    @IsEnum(PrioridadeTarefa)
    prioridade?: PrioridadeTarefa

    @IsOptional()
    @IsIn(["asc", "desc"])
    order?: "asc" | "desc";
}