import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Put, Request } from '@nestjs/common';

import type { RequestWithUser } from "../auth/interfaces/request-with-user.interface";
import { UsersService } from './users.service';
import { UserUpdataDto } from './dto/user.update.dto';
import { UserResponseDto } from './dto/user.response.dto';

@Controller('user')
export class UsersController {
    constructor(private usersService: UsersService){}

    //post de usuario em auth registro

    @Get(":id")
    async aretornaUserId(@Param("id") id: number, @Request() req: RequestWithUser): Promise<UserResponseDto>{
        return await this.usersService.retornaUserAuthId(id, req.user.id);
    }
    
    @Put(":id")
    async alteraUserId(
        @Param("id") idUserUpData: number,  
        @Request() req: RequestWithUser, 
        @Body() userUpdateDto: UserUpdataDto)
    :Promise<UserResponseDto>{
        return await this.usersService.upDateId(idUserUpData, req.user.id, userUpdateDto);
    }

    @Delete(":id")
    @HttpCode(HttpStatus.NO_CONTENT)
    async deletaUserId(@Param("id") id: number, @Request() req: RequestWithUser): Promise<void>{
        return await this.usersService.deleteUserById(id, req.user.id);
    }

}
