import { AuthRegiterRequestDto } from 'src/auth/dto/request/auth.register.request.dto';
export const jwtConstants = {
  secret: process.env.SALT_ROUNDS,
};

import bcrypt from 'bcrypt';
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserDto } from './dto/user.dto';
import { UserUpdataDto } from './dto/user.update.dto';
import { UserRepository } from './repository/user.repository';
import { UserEntity } from './entity/user.entity';

@Injectable()
export class UsersService {
    constructor(private userRepostory: UserRepository, private readonly configService: ConfigService){}

    async retornUserEmail(email: string): Promise<UserEntity | null> {                                                        
        console.log("2.1");                                                                                                   
        return this.userRepostory.findByEmail(email);                                                                         
    }

    async retornaUserAuthId(id: number, idAuthUser: number): Promise<UserDto>{
        if(id != idAuthUser) throw new UnauthorizedException();

        return await this.userRepostory.findById(id);
    }

    async saveUser(userDto: AuthRegiterRequestDto, senhaHash: string): Promise<UserDto>{
        return await this.userRepostory.create({
            name: userDto.name,
            email: userDto.email,
            senha: senhaHash
        });
    }

    async upDateId(idUserUpData: number, idAuthUser: number, userUpdateDto: UserUpdataDto): Promise<UserDto>{
        if(idUserUpData != idAuthUser) throw new UnauthorizedException();

        const saltos = Number(this.configService.getOrThrow<number>("SALT_ROUNDS"));
        const senhaNew: string = await bcrypt.hash(userUpdateDto.senha, saltos);

        return await this.userRepostory.update(idUserUpData, {
            name: userUpdateDto.name,
            email: userUpdateDto.email,
            senha: senhaNew
        });
    }

    async deleteUserById(idUserDelete: number, idAuthUser: number): Promise<void>{
        if( idUserDelete != idAuthUser) throw new UnauthorizedException();

        try{
            await this.userRepostory.delete(idUserDelete);
        }
        catch{
            throw new NotFoundException("Usuário não encontrado");
        }
    }

}
