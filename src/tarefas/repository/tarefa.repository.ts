import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { tarefa } from "generated/prisma/client";
import { TarefaCreateDto } from "../dto/tarefa.create.dto";
import { TarefaUpdataDto } from "../dto/tarefa.update.dto";
import { TarefaEntity } from "../entity/tarefa.entity";
import { ITarefaRepository } from "./itarefa.repository";

@Injectable()
export class TarefaRepository implements ITarefaRepository {
    constructor(private readonly prismaService: PrismaService) {}

    async findById(id: number): Promise<TarefaEntity> {
        const taref: tarefa = await this.prismaService.tarefa.findUniqueOrThrow({
            where: { id }
        });
        return this.toEntity(taref);
    }

    async findByListaId(id: number): Promise<TarefaEntity> {
        const taref: tarefa = await this.prismaService.tarefa.findFirstOrThrow({
            where: { lista_id: id }
        });
        return this.toEntity(taref);
    }

    async create(data: TarefaCreateDto, idLista: number): Promise<TarefaEntity> {
        const taref: tarefa = await this.prismaService.tarefa.create({
            data: {
                titulo: data.titulo,
                realizada: false,
                lista_id: idLista
            }
        });
        return this.toEntity(taref);
    }

    async update(id: number, data: TarefaUpdataDto): Promise<TarefaEntity> {
        const taref: tarefa = await this.prismaService.tarefa.update({
            where: { id },
            data: data
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
            taref.lista_id
        );
    }
}
