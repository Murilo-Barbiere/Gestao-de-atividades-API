import { PrioridadeTarefa } from "src/common/enums/prioridade_Tarefa.enum";

export class TarefaEntity{
    constructor(
        public id: number,
        public titulo: string,
        public realizada: boolean,
        public prioridadeTarefa: PrioridadeTarefa,
        public lista_id: number
    ){}
}
