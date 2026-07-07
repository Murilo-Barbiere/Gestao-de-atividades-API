import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { projeto } from "generated/prisma/client";
import { UpdateProjetoDto } from "../dto/update.projeto.dto";
import { ProjetoEntity } from "../entity/projeto.entity";
import { IProjetoRepository } from "./iprojeto.repository";
import { CreateProjetoRepositoryDto } from "../dto/create.projeto.repository.dto";

@Injectable()
export class ProjetoRepository implements IProjetoRepository {
    constructor(private readonly prismaService: PrismaService) {}

    async findByMany(): Promise<ProjetoEntity[]> {
        const projetos: projeto[] = await this.prismaService.projeto.findMany();
        return projetos.map(projeto => this.toEntity(projeto));
    }

    async findById(id: number): Promise<ProjetoEntity> {
        const projeto: projeto = await this.prismaService.projeto.findUniqueOrThrow({
            where: { id }
        });
        
        return this.toEntity(projeto);
        
    }

    async findByUsersId(idUser: number): Promise<ProjetoEntity[]> {
        const projetos: projeto[] = await this.prismaService.projeto.findMany({
            where: {user_id: idUser}
        });
        return projetos.map(projeto => this.toEntity(projeto));
    }
    
    async create(data: CreateProjetoRepositoryDto): Promise<ProjetoEntity> {
        const projeto: projeto = await this.prismaService.projeto.create({
            data: data
        });
        
        return this.toEntity(projeto);
    }
    
    async update(id: number, data: UpdateProjetoDto): Promise<ProjetoEntity> {
        const projeto: projeto = await this.prismaService.projeto.update({
            where: { id },
            data: data
        });

        return this.toEntity(projeto);
    }

    async delete(id: number): Promise<void> {
        await this.prismaService.projeto.delete({
            where: { id }
        });
    }

    private toEntity(projeto: projeto): ProjetoEntity {
        return new ProjetoEntity(
            projeto.id,
            projeto.nome,
            projeto.user_id,
        );
    }
}