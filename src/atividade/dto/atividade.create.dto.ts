import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { PrioridadeAtividade } from "src/common/enums/prioridade_atividade.enum";

export class AtividadeCreateDto{
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    titulo!: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    idProjeto!: number;

    @IsEnum(PrioridadeAtividade, {message:"Valores permitidos: URGENTE, ALTA, MEDIA, BAIXA"})
    @IsNotEmpty()
    @ApiProperty()
    prioridadeAtividade!: PrioridadeAtividade;

    @IsNotEmpty()
    @Type(() => Date)
    @IsDate()
    @ApiProperty()
    dataVencimento!: Date;

    @IsOptional()
    @IsNumber()
    @ApiProperty()
    paiId?: number;

    @IsString()
    @IsOptional()
    @ApiProperty()
    texto?: string;
}