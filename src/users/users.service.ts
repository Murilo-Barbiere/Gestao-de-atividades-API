import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
    constructor(private prismaService: PrismaService){}

    async retornaUserId(id: number, idUserLogado: number): Promise<UserDto>{
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

        if(!(id == idUserLogado)) throw new UnauthorizedException();

        return userDto;
    }

}
