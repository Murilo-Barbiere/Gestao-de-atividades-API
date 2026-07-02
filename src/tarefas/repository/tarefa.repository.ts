import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { tarefa } from "generated/prisma/client";
import { TarefaCreateDto } from "../dto/tarefa.create.dto";
import { TarefaUpdataDto } from "../dto/tarefa.update.dto";
import { TarefaEntity } from "../entity/tarefa.entity";
import { ITarefaRepository } from "./itarefa.repository";
import { PrioridadeTarefa } from "src/common/enums/prioridade_Tarefa.enum";
import { TarefaQueryParams } from "./tarefa-query.params";

@Injectable()
export class TarefaRepository implements ITarefaRepository {
    constructor(private readonly prismaService: PrismaService) {}

    async findById(id: number): Promise<TarefaEntity> {
        const taref: tarefa = await this.prismaService.tarefa.findUniqueOrThrow({
            where: { id }
        });
        return this.toEntity(taref);
    }

    async findByListaId(params: TarefaQueryParams): Promise<TarefaEntity[]> {
        const tarefas: tarefa[] = await this.prismaService.tarefa.findMany({
            where: params.where,
            orderBy: params.orderBy
        });

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
}
