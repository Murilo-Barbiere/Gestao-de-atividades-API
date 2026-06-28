import { UserEntity } from "../entity/user.entity";
import { IUserRepository } from "./iuser.repository";
import { PrismaService } from "src/prisma/prisma.service";
import { user } from "generated/prisma/client"
import { Injectable } from "@nestjs/common";
import { UserCreateData } from "./data/user.create.data";

@Injectable()
export class UserRepository implements IUserRepository{
    constructor(private prismaService: PrismaService){}
    
    async findById(id: number): Promise<UserEntity> {
        const user: user = await this.prismaService.user.findUniqueOrThrow({where: {id}});
        
        return this.toEntity(user);
    }
    
   async findByEmail(email: string): Promise<UserEntity | null> {                                                            
        console.log("2.2");                                                                                                   
        const user = await this.prismaService.user.findUnique({where: {email}});                                              
        console.log("2.3");                                                                                                   
                                                                                                                              
        if (!user) return null;  // retorna null, não joga erro                                                               
                                                                                                                              
        return this.toEntity(user);                                                                                           
    }

    async create(data: UserCreateData): Promise<UserEntity> {
        const user: user = await this.prismaService.user.create({data: data});

        return this.toEntity(user);
    }

    async update(id: number, data: UserCreateData): Promise<UserEntity> {
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