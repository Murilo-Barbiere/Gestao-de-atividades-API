import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsEnum, IsOptional, IsString } from 'class-validator';
import { PrioridadeAtividade } from 'generated/prisma/enums';

export class AtividadeUpdateDto {
    @IsString()
    @IsOptional()
    titulo?: string;

    @IsBoolean()
    @IsOptional()
    realizada?: boolean;

    @IsEnum(PrioridadeAtividade, {message:"Valores permitidos: URGENTE, ALTA, MEDIA, BAIXA"})
    @IsOptional()
    prioridadeAtividade?: PrioridadeAtividade;

    @Type(() => Date)
    @IsDate()
    @IsOptional()
    dataVencimento?: Date;

    @IsString()
    @IsOptional()
    texto?: string;
}