import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Prisma, tarefa } from "generated/prisma/client";
import { TarefaCreateDto } from "../dto/tarefa.create.dto";
import { TarefaUpdataDto } from "../dto/tarefa.update.dto";
import { TarefaEntity } from "../entity/tarefa.entity";
import { ITarefaRepository } from "./itarefa.repository";
import { PrioridadeTarefa } from "src/common/enums/prioridade_Tarefa.enum";
import { TarefaFiltro } from "./tarefa.filtro";
import { StatusFiltro } from "src/common/enums/status_filtro.enum";
import { TarefaOrdenacao } from "src/common/enums/tarefa_ordenacao.enum";

@Injectable()
export class TarefaRepository implements ITarefaRepository {
    constructor(private readonly prismaService: PrismaService) {}

    async findById(id: number): Promise<TarefaEntity> {
        const taref: tarefa = await this.prismaService.tarefa.findUniqueOrThrow({
            where: { id }
        });
        return this.toEntity(taref);
    }

    async findByListaId(filtro: TarefaFiltro): Promise<TarefaEntity[]> {
        const where = this.montarWhere(filtro);
        const orderBy = this.montarOrderBy(filtro);

        const tarefas = await this.prismaService.tarefa.findMany({ where, orderBy });
        return tarefas.map(tarefa => this.toEntity(tarefa));
    }


    async create(data: TarefaCreateDto): Promise<TarefaEntity> {
        const taref: tarefa = await this.prismaService.tarefa.create({
            data: {
                titulo: data.titulo,
                realizada: false,
                prioridade: data.prioridadeTarefa,
                lista_id: data.idList,
                data_vencimento: data.dataVencimento
            }
        });
        return this.toEntity(taref);
    }

    async update(id: number, data: TarefaUpdataDto): Promise<TarefaEntity> {
        const taref: tarefa = await this.prismaService.tarefa.update({
            where: { id },
            data: {
                titulo: data.titulo,
                realizada: data.realizada,
                prioridade: data.prioridadeTarefa,
            }
        });
        return this.toEntity(taref);
    }

    async delete(id: number): Promise<void> {
        await this.prismaService.tarefa.delete({
            where: { id }
        });
    }

    async adicionarTag(
    idTarefa: number,
    idTag: number,
    ): Promise<void> {

        await this.prismaService.tarefa.update({
            where: {
                id: idTarefa,
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

    private toEntity(taref: tarefa): TarefaEntity {
        return new TarefaEntity(
            taref.id,
            taref.titulo,
            taref.realizada,
            taref.prioridade as PrioridadeTarefa,
            taref.data_vencimento,
            taref.lista_id
        );
    }


    private montarWhere(filtro: TarefaFiltro): Prisma.tarefaWhereInput {
    const where: Prisma.tarefaWhereInput = { lista_id: filtro.idLista };

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

    private montarOrderBy(filtro: TarefaFiltro): Prisma.tarefaOrderByWithRelationInput | undefined {
        if (!filtro.ordenarPor) return undefined;

        const direction = filtro.direcao ?? 'asc';

        const sortMap: Record<TarefaOrdenacao, Prisma.tarefaOrderByWithRelationInput> = {
            [TarefaOrdenacao.PRIORIDADE]: { prioridade: direction },
            [TarefaOrdenacao.DATA_CRIACAO]: { id: direction },
            [TarefaOrdenacao.DATA_VENCIMENTO]: { data_vencimento: direction },
            [TarefaOrdenacao.TITULO]: { titulo: direction },
        };

        return sortMap[filtro.ordenarPor];
    }
}
