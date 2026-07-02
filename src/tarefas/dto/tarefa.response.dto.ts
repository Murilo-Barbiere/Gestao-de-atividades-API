import { PrioridadeTarefa } from "src/common/enums/prioridade_Tarefa.enum";

export class TarefaResponseDto{
    id!: number;
    titulo!: string;
    realizada!: boolean;
    lista_id!: number;
    data_vencimento!: Date;
    prioridade!: PrioridadeTarefa;
    vencido!: boolean;
}