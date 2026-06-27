import { Body, Controller, Get, Param, Put, Request } from '@nestjs/common';

import type { RequestWithUser } from "../auth/interfaces/request-with-user.interface";
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { UserUpdataDto } from './dto/user.update.dto';

@Controller('user')
export class UsersController {
    constructor(private usersService: UsersService){}

    //post de usuario em auth registro

    @Get(":id")
    retornaUserId(@Param("id") id: number, @Request() req: RequestWithUser): Promise<UserDto>{
        return this.usersService.retornaUserAuthId(id, req.user.id);
    }
    
    @Put(":id")
    alteraUserId(
        @Param("id") idUserUpData: number,  
        @Request() req: RequestWithUser, 
        @Body() userUpdateDto: UserUpdataDto)
    :Promise<UserDto>{
        return this.usersService.upDate(idUserUpData, req.user.id, userUpdateDto);
    }
/*
    @Delete(":id")
    deletaUserId(@Param("id") id: number): Promise<UserDto>{

    }

*/
}
