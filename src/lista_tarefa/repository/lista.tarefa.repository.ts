import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { lista_tarefa } from "generated/prisma/client";
import { UpdateListaTarefaDto } from "../dto/update.lista.tarefa.dto";
import { ListaTarefaEntity } from "../entity/lista.tarefa.entity";
import { IListaTarefaRepository } from "./ilista.tarefas.repository";
import { CreateListaTarefaRepositoryDto } from "../dto/create.lista.tarefa.repository.dto";

@Injectable()
export class ListaTarefaRepository implements IListaTarefaRepository {
    constructor(private readonly prismaService: PrismaService) {}

    async findById(id: number): Promise<ListaTarefaEntity> {
        const lista: lista_tarefa = await this.prismaService.lista_tarefa.findUniqueOrThrow({
            where: { id }
        });
        
        return this.toEntity(lista);
        
    }

    async findByUsersId(idUser: number): Promise<ListaTarefaEntity[]> {
        const listas: lista_tarefa[] = await this.prismaService.lista_tarefa.findMany({
            where: {user_id: idUser}
        });
        return listas.map(lista => this.toEntity(lista));
    }
    
    async create(data: CreateListaTarefaRepositoryDto): Promise<ListaTarefaEntity> {
        const lista: lista_tarefa = await this.prismaService.lista_tarefa.create({
            data: data
        });
        
        return this.toEntity(lista);
    }
    
    async update(id: number, data: UpdateListaTarefaDto): Promise<ListaTarefaEntity> {
        const lista: lista_tarefa = await this.prismaService.lista_tarefa.update({
            where: { id },
            data: data
        });

        return this.toEntity(lista);
    }

    async delete(id: number): Promise<void> {
        await this.prismaService.lista_tarefa.delete({
            where: { id }
        });
    }

    private toEntity(lista: lista_tarefa): ListaTarefaEntity {
        return new ListaTarefaEntity(
            lista.id,
            lista.nome,
            lista.user_id,
        );
    }
}
