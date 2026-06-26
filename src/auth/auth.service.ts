import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";

import { PrismaService } from "src/prisma/prisma.service";
import { AuthRegiterRequestDto } from './dto/request/auth.register.request.dto';
import { AuthRegiterResponseDto } from './dto/response/auth.register.response.dto';
import { AuthLoginRequestDto } from './dto/request/auth.login.request.dto';
import { UserDto } from "../users/dto/user.dto"

@Injectable()
export class AuthService{
    constructor(private prismaService: PrismaService, private jwtService: JwtService){};

    async register(authRegiterRequestDto: AuthRegiterRequestDto): Promise<AuthRegiterResponseDto>{
        const userFlag = await this.prismaService.user.findUnique({
            where: {
                email: authRegiterRequestDto.email,
            },
        });
        if(userFlag) throw new NotFoundException("Usuário já registrado");


        const senhaHash = await bcrypt.hash(authRegiterRequestDto.senha, 10);
        const user = await this.prismaService.user.create({
            data: {
                name: authRegiterRequestDto.nome,
                email: authRegiterRequestDto.email,
                senha: senhaHash
            },
        });

        return {
            id: user.id,
            nome: user.name,
            email: user.email
        };
    }

    async login(authLoginResquestDto: AuthLoginRequestDto, ): Promise<{ tokenJwt: string }>{
        const user = await this.prismaService.user.findUnique({
            where: {
                email: authLoginResquestDto.email,
            },
        });

        if(!user) throw new NotFoundException("Usuário não encontrado");

        if(!await bcrypt.compare(authLoginResquestDto.senha, user.senha)){
            throw new UnauthorizedException("E-mail ou senha inválidos")
        }

        const playLoad = {
            id: user.id, 
            name: user.name,
            email: user.email
        }

        const tokenJwt = await this.jwtService.signAsync(playLoad);
        
        return {tokenJwt};
    }
}