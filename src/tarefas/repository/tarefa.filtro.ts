import { StatusFiltro } from 'src/common/enums/status_filtro.enum';
import { PrioridadeTarefa } from 'src/common/enums/prioridade_Tarefa.enum';
import { TarefaOrdenacao } from 'src/common/enums/tarefa_ordenacao.enum';

export interface TarefaFiltro {
    idLista: number;
    status?: StatusFiltro;
    prioridade?: PrioridadeTarefa;
    ordenarPor?: TarefaOrdenacao;
    direcao?: 'asc' | 'desc';
}