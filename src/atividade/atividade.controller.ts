import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Query, Request } from '@nestjs/common';
import { AtividadeResponseDto } from './dto/atividade.response.dto';
import type { RequestWithUser } from '../auth/interfaces/request-with-user.interface';
import { AtividadeService } from './atividade.service';
import { AtividadeCreateDto } from './dto/atividade.create.dto';
import { AtividadeUpdateDto } from './dto/atividade.update.dto';
import { BuscarAtividadesQueryDto } from './dto/buscar_atividades_query.dto';
import { TagsCreateDto } from '../tags/dto/tags.create.dto';
import { TagsResponseDto } from '../tags/dto/tags.response.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Atividades')
@Controller()
export class AtividadeController {
    constructor(private atividadeService: AtividadeService){}

    @Get("projeto/:idProjeto/atividades")
    async retorneAtividadesDoProjeto(
        @Request() req: RequestWithUser,
        @Param("idProjeto", ParseIntPipe) idProjeto: number,
        @Query() query: BuscarAtividadesQueryDto
    )
    : Promise<AtividadeResponseDto[]>{
        return this.atividadeService.retorneAtividadesDoProjeto(req.user.id, idProjeto, query);
    }
    
    @Get("atividade/:idAtividade")
    async retorneAtividade(@Request() req: RequestWithUser, @Param("idAtividade", ParseIntPipe) idAtividade: number)
    : Promise<AtividadeResponseDto>{
        return this.atividadeService.retornePorId(req.user.id, idAtividade);
    }

    @Post("/atividade")
    async criarAtividade(
        @Request() req: RequestWithUser,
        @Body() atividadeCreateDto: AtividadeCreateDto)
    : Promise<AtividadeResponseDto>{
        return this.atividadeService.create(req.user.id, atividadeCreateDto);
    }

    @Patch("atividade/:id")
    async atualizarAtividade(
        @Request() req: RequestWithUser,
        @Param("id", ParseIntPipe) id: number,
        @Body() atividadeUpdateDto: AtividadeUpdateDto,
    ): Promise<AtividadeResponseDto> {
        return this.atividadeService.update(req.user.id, id, atividadeUpdateDto);
    }

    @Delete("atividade/:id")
    @HttpCode(HttpStatus.NO_CONTENT)
    async removerAtividade(
        @Request() req: RequestWithUser,
        @Param("id", ParseIntPipe) id: number,
    ): Promise<void> {
        return this.atividadeService.remove(req.user.id, id);
    }

    @Post("atividade/:idAtividade/tags")
    async relacionaTagAtividade(
        @Request() req: RequestWithUser,
        @Param("idAtividade", ParseIntPipe) idAtividade: number,
        @Body() tagsCreateDto: TagsCreateDto
    ): Promise<TagsResponseDto>{
        return this.atividadeService.relacionaTagAtividade(idAtividade, req.user.id, tagsCreateDto);
    }
}