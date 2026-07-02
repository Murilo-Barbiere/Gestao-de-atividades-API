export class TarefaResponseDto{
    id!: number;
    titulo!: string;
    realizada!: boolean;
    lista_id!: number;
    data_vencimento!: Date;
    vencido!: boolean;
}