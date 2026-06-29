import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class TarefaUpdataDto {
    @IsString()
    @IsOptional()
    titulo!: string;

    @IsBoolean()
    @IsOptional()
    realizada!: boolean;
}