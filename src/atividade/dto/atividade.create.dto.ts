import { Type } from "class-transformer";
import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { PrioridadeAtividade } from "src/common/enums/prioridade_atividade.enum";

export class AtividadeCreateDto{
    @IsString()
    @IsNotEmpty()
    titulo!: string;

    @IsNumber()
    @IsNotEmpty()
    idProjeto!: number;

    @IsEnum(PrioridadeAtividade, {message:"Valores permitidos: URGENTE, ALTA, MEDIA, BAIXA"})
    @IsNotEmpty()
    prioridadeAtividade!: PrioridadeAtividade;

    @IsNotEmpty()
    @Type(() => Date)
    @IsDate()
    dataVencimento!: Date;
}