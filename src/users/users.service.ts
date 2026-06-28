import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from './dto/user.dto';
import { AuthRegiterRequestDto } from 'src/auth/dto/request/auth.register.request.dto';
import { UserUpdataDto } from './dto/user.update.dto';
export const jwtConstants = {
  secret: process.env.SALT_ROUNDS,
};

import bcrypt from 'bcrypt';
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
    constructor(private prismaService: PrismaService, private readonly configService: ConfigService){}

    async retornaUserAuthId(id: number, idAuthUser: number): Promise<UserDto>{
        if(id != idAuthUser) throw new UnauthorizedException();

        const userDto: UserDto = await this.prismaService.user.findUniqueOrThrow({
            where: {
                id,
            },
            select:{
                id: true,
                name: true,
                email: true,
            },
        });


        return userDto;
    }

    async saveUser(userDto: AuthRegiterRequestDto, senhaHash: string): Promise<UserDto>{
        return await this.prismaService.user.create({
            data:{
                name: userDto.name,
                email: userDto.email,
                senha: senhaHash,
            },
            select: {
                id: true,
                name: true,
                email: true,
            },
        });
    }

    async upDateId(idUserUpData: number, idAuthUser: number, userUpdateDto: UserUpdataDto): Promise<UserDto>{
        if(idUserUpData != idAuthUser) throw new UnauthorizedException();

        const saltos = Number(this.configService.getOrThrow<number>("SALT_ROUNDS"));
        const senhaNew: string = await bcrypt.hash(userUpdateDto.senha, saltos);


        return await this.prismaService.user.update({
            where: { id: idUserUpData },
            data: {
                name: userUpdateDto.name,
                email: userUpdateDto.email,
                senha: senhaNew
            },
            select: {
                id: true,
                name: true,
                email: true,
            }
        });
    }

    async deleteUserById(idUserDelete: number, idAuthUser: number): Promise<void>{
        if( idUserDelete != idAuthUser) throw new UnauthorizedException();

        try{
            await this.prismaService.user.delete({
                where:{ id: idUserDelete }
            });
        }
        catch{
            throw new NotFoundException("Usuário não encontrado");
        }
    }

}
