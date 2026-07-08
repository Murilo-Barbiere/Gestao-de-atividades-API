import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Put, Request } from '@nestjs/common';

import type { RequestWithUser } from "../auth/interfaces/request-with-user.interface";
import { UsersService } from './users.service';
import { UserUpdataDto } from './dto/user.update.dto';
import { UserResponseDto } from './dto/user.response.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
export class UsersController {
    constructor(private usersService: UsersService){}

    @Get(":id")
    async retornaUserId(@Param("id") id: number, @Request() req: RequestWithUser): Promise<UserResponseDto>{
        return await this.usersService.retornaUserAuthId(id, req.user.id);
    }
    
    @Put(":id")
    async alteraUserId(
        @Param("id", ParseIntPipe) idUserUpData: number,  
        @Request() req: RequestWithUser, 
        @Body() userUpdateDto: UserUpdataDto)
    :Promise<UserResponseDto>{
        return await this.usersService.upDateId(idUserUpData, req.user.id, userUpdateDto);
    }

    @Delete(":id")
    @HttpCode(HttpStatus.NO_CONTENT)
    async deletaUserId(@Param("id", ParseIntPipe) id: number, @Request() req: RequestWithUser): Promise<void>{
        return await this.usersService.deleteUserById(id, req.user.id);
    }

}
