import { PrioridadeTarefa } from "src/common/enums/prioridade_Tarefa.enum";

export class TarefaEntity{
    constructor(
        public id: number,
        public titulo: string,
        public realizada: boolean,
        public prioridade: PrioridadeTarefa,
        public data_vencimento: Date,
        public lista_id: number
    ){}

    get vencido(): boolean {
        return (
            !this.realizada &&
            this.data_vencimento < new Date()
        );
    }
    
}
