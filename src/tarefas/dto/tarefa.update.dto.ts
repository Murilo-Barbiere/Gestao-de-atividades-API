import { IsString } from 'class-validator';

export class TarefaUpdataDto {
    @IsString()
    titulo!: string;

    @IsString()
    realizada!: boolean;
}