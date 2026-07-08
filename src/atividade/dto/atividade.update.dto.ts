import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsEnum, IsOptional, IsString } from 'class-validator';
import { PrioridadeAtividade } from 'generated/prisma/enums';

export class AtividadeUpdateDto {
    @IsString()
    @IsOptional()
    @ApiProperty()
    titulo?: string;

    @IsBoolean()
    @IsOptional()
    @ApiProperty()
    realizada?: boolean;

    @IsEnum(PrioridadeAtividade, {message:"Valores permitidos: URGENTE, ALTA, MEDIA, BAIXA"})
    @IsOptional()
    @ApiProperty()
    prioridadeAtividade?: PrioridadeAtividade;

    @Type(() => Date)
    @IsDate()
    @IsOptional()
    @ApiProperty()
    dataVencimento?: Date;

    @IsString()
    @IsOptional()
    @ApiProperty()
    texto?: string;
}