import { PrioridadeAtividade } from "src/common/enums/prioridade_atividade.enum";

export class AtividadeResponseDto{
    id!: number;
    titulo!: string;
    realizada!: boolean;
    projeto_id!: number;
    data_vencimento!: Date;
    prioridade!: PrioridadeAtividade;
    vencido!: boolean;
    paiId?: number;
}