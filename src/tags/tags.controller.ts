import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Request } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsCreateDto } from './dto/tags.create.dto';
import { TagsUpdateDto } from './dto/tags.update.dto';
import { TagsResponseDto } from './dto/tags.response.dto';
import type { RequestWithUser } from 'src/auth/interfaces/request-with-user.interface';

@Controller('tags')
export class TagsController {
    constructor(private tagsService: TagsService){}

    @Post()
    async criaTag(@Body() tagsCreateDto: TagsCreateDto){
        return this.tagsService.criar(tagsCreateDto);
    }

    @Get()
    async retornaTodasTags(): Promise<TagsResponseDto[]>{
        console.log("1")
        return this.tagsService.retornarTodos();
    }
    
    @Get(":name")
    async retornaTagsPorName(@Param("name") name_tag: string): Promise<TagsResponseDto>{
        return this.tagsService.retornarByName(name_tag);
    }

    @Get(":id")
    async retornaTagsPorId(@Param("id", ParseIntPipe) id_tag: number): Promise<TagsResponseDto>{
        return this.tagsService.retornarById(id_tag);
    }

    @Put(":id")
    async atualizaDados(
        @Request() req: RequestWithUser,
        @Param("id", ParseIntPipe) id_tag: number,
        @Body() tagsUpdateDto: TagsUpdateDto,
        ): Promise<TagsResponseDto>{
        return this.tagsService.update(id_tag, req.user.id, tagsUpdateDto);
    }

    @Delete(":id")
    @HttpCode(HttpStatus.NO_CONTENT)
    async deletaTag(@Request() req: RequestWithUser, @Param("id", ParseIntPipe) id_tag: number,): Promise<void>{
        return this.tagsService.datele(id_tag, req.user.id);
    }
}
