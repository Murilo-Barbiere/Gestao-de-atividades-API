import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { projeto } from "generated/prisma/client";
import { UpdateProjetoDto } from "../dto/update.projeto.dto";
import { ProjetoEntity } from "../entity/projeto.entity";
import { IProjetoRepository } from "./iprojeto.repository";
import { CreateProjetoDto } from "../dto/create.projeto.dto";
import { UserEntity } from "src/users/entity/user.entity";
import { user } from "generated/prisma";

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
            where: {
                user: {
                    some: {
                        id: idUser
                    }
                }
            }
        });
        return projetos.map(projeto => this.toEntity(projeto));
    }

    async findUsersByProjeto(idProjeto: number): Promise<UserEntity[]> {
        const projeto = await this.prismaService.projeto.findUnique({
            where: {
                id: idProjeto,
            },
            select: {
                user: true,
            },
        });

        if (!projeto) {
            return [];
        }

        return projeto.user.map(user => this.toUserEntityUser(user));
    }

    async findUserById(idProjeto: number, idUser: number): Promise<UserEntity | null> {
        const user = await this.prismaService.user.findFirst({
            where: {
                id: idUser,
                projetos: {
                    some: {
                        id: idProjeto,
                    },
                },
            },
        });

        if (!user) {
            return null;
        }

        return this.toUserEntityUser(user);
    }
    
    async create(data: CreateProjetoDto): Promise<ProjetoEntity> {
        const projeto: projeto = await this.prismaService.projeto.create({
            data: data
        });
        
        return this.toEntity(projeto);
    }

    async adicionarParticipante(idProjeto: number, idUser: number): Promise<void> {
        await this.prismaService.projeto.update({
            where: {
                id: idProjeto,
            },
            data: {
                user: {
                    connect: {
                        id: idUser,
                    },
                },
            },
        });
    }

    async removerParticipante(idProjeto: number, idUser: number): Promise<void> {
        await this.prismaService.projeto.update({
            where: {
                id: idProjeto,
            },
            data: {
                user: {
                    disconnect: {
                        id: idUser,
                    },
                },
            },
        });
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
            projeto.nome
        );
    }

    private toUserEntityUser(user: user): UserEntity {
        return new UserEntity(
            user.id,
            user.name,
            user.email,
            user.senha,
        );
    }
}