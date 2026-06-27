import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { AuthRegiterRequestDto } from './dto/request/auth.register.request.dto';
import { AuthRegiterResponseDto } from './dto/response/auth.register.response.dto';
import { AuthLoginRequestDto } from './dto/request/auth.login.request.dto';
import { AuthLoginResponseDto } from './dto/response/auth.login.response.dto';
import { user } from 'generated/prisma/browser';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(
    authRegiterRequestDto: AuthRegiterRequestDto,
  ): Promise<AuthRegiterResponseDto> {
    const userFlag = await this.prismaService.user.findUnique({
      where: {
        email: authRegiterRequestDto.email,
      },
    });
    if (userFlag) throw new ConflictException('Dados invalidos');

    const senhaHash = await bcrypt.hash(authRegiterRequestDto.senha, 10);
    const user: user = await this.prismaService.user.create({
      data: {
        name: authRegiterRequestDto.nome,
        email: authRegiterRequestDto.email,
        senha: senhaHash,
      },
    });

    return {
      id: user.id,
      nome: user.name,
      email: user.email,
    };
  }

  async login(
    authLoginResquestDto: AuthLoginRequestDto,
  ): Promise<AuthLoginResponseDto> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: authLoginResquestDto.email,
      },
    });

    if (!user) throw new UnauthorizedException('E-mail ou senha inválidos');

    if (!(await bcrypt.compare(authLoginResquestDto.senha, user.senha))) {
      throw new UnauthorizedException('E-mail ou senha inválidos');
    }

    const payLoad = { id: user.id };

    const resposta: AuthLoginResponseDto = {
      tokenJwt: await this.jwtService.signAsync(payLoad),
    };

    return resposta;
  }
}
