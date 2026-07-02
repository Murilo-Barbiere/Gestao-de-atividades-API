import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsEnum, IsOptional, IsString } from 'class-validator';
import { PrioridadeTarefa } from 'generated/prisma/enums';

export class TarefaUpdataDto {
    @IsString()
    @IsOptional()
    titulo?: string;

    @IsBoolean()
    @IsOptional()
    realizada?: boolean;

    @IsEnum(PrioridadeTarefa, {message:"Valores permitidos: URGENTE, ALTA, MEDIA, BAIXA"})
    @IsOptional()
    prioridadeTarefa?: PrioridadeTarefa;

    @Type(() => Date)
    @IsDate()
    @IsOptional()
    dataVencimento?: Date;
}