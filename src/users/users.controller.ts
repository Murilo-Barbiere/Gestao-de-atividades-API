import { Controller, Get, Param, Request } from '@nestjs/common';

import type { RequestWithUser } from "../auth/interfaces/request-with-user.interface";
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';

@Controller('user')
export class UsersController {
    constructor(private usersService: UsersService){}

    //post de usuario em auth registro

    @Get(":id")
    retornaUserId(@Param("id") id: number, @Request() req: RequestWithUser): Promise<UserDto>{
        return this.usersService.retornaUserId(id, req.user.id);
    }
/*
    @Delete(":id")
    deletaUserId(@Param("id") id: number): Promise<UserDto>{

    }

    @Put(":id")
    alteraUserId(@Param("id") id: number): Promise<UserDto>{

    }
*/
}
