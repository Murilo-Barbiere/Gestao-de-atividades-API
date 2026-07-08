import { PrioridadeAtividade } from "src/common/enums/prioridade_atividade.enum";

export class AtividadeEntity{
    constructor(
        public id: number,
        public titulo: string,
        public realizada: boolean,
        public prioridade: PrioridadeAtividade,
        public data_vencimento: Date,
        public projeto_id: number,
        public paiId?: number
    ){}

    get vencido(): boolean {
        return (
            !this.realizada &&
            this.data_vencimento < new Date()
        );
    }
    
}
