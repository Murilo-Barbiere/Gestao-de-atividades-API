import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { AuthRegiterRequestDto } from './dto/request/auth.register.request.dto';
import { AuthLoginRequestDto } from './dto/request/auth.login.request.dto';
import { AuthLoginResponseDto } from './dto/response/auth.login.response.dto';
import { UsersService } from 'src/users/users.service';
import { AuthRegiterResponseDto } from './dto/response/auth.register.response.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async register(authRegiterRequestDto: AuthRegiterRequestDto): Promise<AuthRegiterResponseDto> {
    const userFlag = await this.usersService.retornUserEmail(authRegiterRequestDto.email);
    if (userFlag) throw new ConflictException('Dados invalidos');

    const senhaHash = await bcrypt.hash(authRegiterRequestDto.senha, 10);
    
    return this.usersService.saveUser(authRegiterRequestDto, senhaHash)
  }

  async login(authLoginResquestDto: AuthLoginRequestDto): Promise<AuthLoginResponseDto> {
    const user = await this.usersService.retornUserEmail(authLoginResquestDto.email);
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
