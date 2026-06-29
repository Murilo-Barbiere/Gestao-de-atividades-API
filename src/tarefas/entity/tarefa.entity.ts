export class TarefaEntity{
    constructor(
        public id: number,
        public titulo: string,
        public realizada: boolean,
        public lista_id: number
    ){}
}
