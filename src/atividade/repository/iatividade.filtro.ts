import { StatusFiltro } from 'src/common/enums/status_filtro.enum';
import { PrioridadeAtividade } from 'src/common/enums/prioridade_atividade.enum';
import { AtividadeOrdenacao } from 'src/common/enums/atividade_ordenacao.enum';

export interface AtividadeFiltro {
    idProjeto: number;
    status?: StatusFiltro;
    tag?: string;

    prioridade?: PrioridadeAtividade;
    ordenarPor?: AtividadeOrdenacao;
    direcao?: 'asc' | 'desc';
}