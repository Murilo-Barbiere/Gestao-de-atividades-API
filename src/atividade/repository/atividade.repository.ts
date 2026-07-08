import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { Prisma, atividade } from "generated/prisma/client";
import { AtividadeCreateDto } from "../dto/atividade.create.dto";
import { AtividadeUpdateDto } from "../dto/atividade.update.dto";
import { AtividadeEntity } from "../entity/atividade.entity";
import { IAtividadeRepository } from "./iatividade.repository";
import { PrioridadeAtividade } from "../../common/enums/prioridade_atividade.enum";
import { AtividadeFiltro } from "./iatividade.filtro";
import { StatusFiltro } from "../../common/enums/status_filtro.enum";
import { AtividadeOrdenacao } from "../../common/enums/atividade_ordenacao.enum";
import { TagsEntity } from "src/tags/entity/tags.entity";

@Injectable()
export class AtividadeRepository implements IAtividadeRepository {
    constructor(private readonly prismaService: PrismaService) {}

    async findById(id: number): Promise<AtividadeEntity> {
        const  atividade = await this.prismaService.atividade.findUniqueOrThrow({
            where: { id },
            include: 
            {
                tags: true,
            },
        });

        return this.toEntity(atividade);
    }

    async findByProjetoId(filtro: AtividadeFiltro): Promise<AtividadeEntity[]> {
        const where = this.montarWhere(filtro);
        const orderBy = this.montarOrderBy(filtro);

        const atividades = await this.prismaService.atividade.findMany({
            where,
            include: {
                tags: true,
            },
            orderBy 
        });

        return atividades.map(atividade => this.toEntity(atividade));
    }


    async create(data: AtividadeCreateDto): Promise<AtividadeEntity> {
        const atividade: atividade = await this.prismaService.atividade.create({
            data: {
                titulo: data.titulo,
                realizada: false,
                prioridade: data.prioridadeAtividade,
                projeto_id: data.idProjeto,
                data_vencimento: data.dataVencimento,
                paiId: data.paiId,
            }
        });
        return this.toEntity(atividade);
    }

    async update(id: number, data: AtividadeUpdateDto): Promise<AtividadeEntity> {
        const atividade: atividade = await this.prismaService.atividade.update({
            where: { id },
            data: {
                titulo: data.titulo,
                realizada: data.realizada,
                prioridade: data.prioridadeAtividade,
            }
        });
        return this.toEntity(atividade);
    }

    async delete(id: number): Promise<void> {
        await this.prismaService.atividade.delete({
            where: { id }
        });
    }

    async adicionarTag(
    idAtividade: number,
    idTag: number,
    ): Promise<void> {

        await this.prismaService.atividade.update({
            where: {
                id: idAtividade,
            },
            data: {
                tags: {
                    connect: {
                        id: idTag,
                    },
                },
            },
        });
    }

    private toEntity(atividade: atividade & { tags?: any[] , texto?: string | null}): AtividadeEntity {
        const tagsMapeadas: TagsEntity[] = atividade.tags?.map(
            tag => new TagsEntity(tag.id, tag.name, tag.user_id)
        ) ?? [];

        return new AtividadeEntity(
            atividade.id,
            atividade.titulo,
            atividade.realizada,
            atividade.prioridade as PrioridadeAtividade,
            atividade.data_vencimento,
            atividade.projeto_id,
            tagsMapeadas,
            atividade.paiId ?? undefined,
            atividade.texto ?? undefined,
        );
    }


    private montarWhere(filtro: AtividadeFiltro): Prisma.atividadeWhereInput {
        const where: Prisma.atividadeWhereInput = { projeto_id: filtro.idProjeto };

        if(filtro.busca) {
            where.OR = [
            {
                titulo: {
                    contains: filtro.busca,
                    mode: 'insensitive',
                },
            },
            {
                tags: {
                    some: {
                        name: {
                            contains: filtro.busca,
                            mode: 'insensitive',
                        },
                    },
                },
            }];
        }

        if(filtro.tag) where.tags = {
            some: {
                name: filtro.tag 
            }
        };

        switch (filtro.status) {
            case StatusFiltro.PENDENTE:
                where.realizada = false;
                break;  
            case StatusFiltro.CONCLUIDA:
                where.realizada = true;
                break;
            case StatusFiltro.VENCIDA:
                where.realizada = false;
                where.data_vencimento = { lt: new Date() };
                break;
        }

        if (filtro.prioridade) where.prioridade = filtro.prioridade;
        return where;
    }

    private montarOrderBy(filtro: AtividadeFiltro): Prisma.atividadeOrderByWithRelationInput | undefined {
        if (!filtro.ordenarPor) return undefined;

        const direction = filtro.direcao ?? 'asc';

        const sortMap: Record<AtividadeOrdenacao, Prisma.atividadeOrderByWithRelationInput> = {
            [AtividadeOrdenacao.PRIORIDADE]: { prioridade: direction },
            [AtividadeOrdenacao.DATA_CRIACAO]: { id: direction },
            [AtividadeOrdenacao.DATA_VENCIMENTO]: { data_vencimento: direction },
            [AtividadeOrdenacao.TITULO]: { titulo: direction },
        };

        return sortMap[filtro.ordenarPor];
    }
}