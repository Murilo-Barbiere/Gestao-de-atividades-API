import { UserEntity } from "../entity/user.entity";
import { IUserRepository } from "./iuser.repository";
import { PrismaService } from "src/prisma/prisma.service";
import { user } from "generated/prisma/client"
import { Injectable } from "@nestjs/common";
import { UserCreateDto } from "../dto/user.create.dto";
import { UserUpdataDto } from "../dto/user.update.dto";

@Injectable()
export class UserRepository implements IUserRepository{
    constructor(private prismaService: PrismaService){}
    
    async findById(id: number): Promise<UserEntity> {
        const user: user = await this.prismaService.user.findUniqueOrThrow({where: {id}});
        
        return this.toEntity(user);
    }
    
   async findByEmail(email: string): Promise<UserEntity | null> {                                                                                                                                                              
        const user = await this.prismaService.user.findUnique({where: {email}});                                                                                                                                                                                                                                              
        if (!user) return null;                                                         
                                                                                                                              
        return this.toEntity(user);                                                                                           
    }

    async create(data: UserCreateDto): Promise<UserEntity> {
        const user: user = await this.prismaService.user.create({data: data});

        return this.toEntity(user);
    }

    async update(id: number, data: UserUpdataDto): Promise<UserEntity> {
        const user: user = await this.prismaService.user.update({
            where: { id: id},
            data: data
        })

        return this.toEntity(user);
    }

    async delete(id: number): Promise<void> {
        await this.prismaService.user.delete({where:{id: id}})
    }

    private toEntity(user: user): UserEntity {
        return new UserEntity(
            user.id,
            user.name,
            user.email,
            user.senha,
        );
    }

}