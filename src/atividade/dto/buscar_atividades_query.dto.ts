import { IsEnum, IsIn, IsOptional, IsString } from "class-validator";
import { PrioridadeAtividade } from "src/common/enums/prioridade_atividade.enum";
import { StatusFiltro } from "src/common/enums/status_filtro.enum";
import { AtividadeOrdenacao } from "src/common/enums/atividade_ordenacao.enum";

export class BuscarAtividadesQueryDto {

    @IsOptional()
    @IsEnum(StatusFiltro)
    status?: StatusFiltro;

    @IsOptional()
    @IsEnum(AtividadeOrdenacao)
    sort?: AtividadeOrdenacao;

    @IsOptional()
    @IsEnum(PrioridadeAtividade)
    prioridade?: PrioridadeAtividade;

    @IsOptional()
    @IsString()
    tag?: string;

    @IsOptional()
    @IsString()
    busca?: string;

    @IsOptional()
    @IsIn(["asc", "desc"])
    order?: "asc" | "desc";
}