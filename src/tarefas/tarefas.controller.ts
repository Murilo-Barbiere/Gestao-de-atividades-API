import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Query, Request } from '@nestjs/common';
import { TarefaResponseDto } from './dto/tarefa.response.dto';
import type { RequestWithUser } from 'src/auth/interfaces/request-with-user.interface';
import { TarefasService } from './tarefas.service';
import { TarefaCreateDto } from './dto/tarefa.create.dto';
import { TarefaUpdataDto } from './dto/tarefa.update.dto';
import { BuscarTarefasQueryDto } from './dto/buscar_tarefas_query.dto';

@Controller()
export class TarefasController {
    constructor(private tarefasService: TarefasService){}

    @Get("listas-tarefa/:idLista/tarefas")
    async retorneTarefasDaLista(
        @Request() req: RequestWithUser,
        @Param("idLista", ParseIntPipe) idLista: number,
        @Query() query: BuscarTarefasQueryDto
    )
    : Promise<TarefaResponseDto[]>{
        return this.tarefasService.retorneTarefasDaLista(req.user.id, idLista, query);
    }
    
    @Get("tarefas/:idTarefa")
    async retorneTarefa(@Request() req: RequestWithUser, @Param("idTarefa", ParseIntPipe) idTarefa: number)
    : Promise<TarefaResponseDto>{
        return this.tarefasService.retornePorId(req.user.id, idTarefa);
    }

    @Post("/tarefas")
    async criarTarefa(
        @Request() req: RequestWithUser,
        @Body() tarefaCreateDto: TarefaCreateDto)
    : Promise<TarefaResponseDto>{
        return this.tarefasService.create(req.user.id, tarefaCreateDto);
    }

    @Patch("tarefas/:id")
    async atualizarTarefa(
        @Request() req: RequestWithUser,
        @Param("id", ParseIntPipe) id: number,
        @Body() tarefaUpdataDto: TarefaUpdataDto,
    ): Promise<TarefaResponseDto> {
        return this.tarefasService.update(req.user.id, id, tarefaUpdataDto);
    }

    @Delete("tarefas/:id")
    @HttpCode(HttpStatus.NO_CONTENT)
    async removerTarefa(
        @Request() req: RequestWithUser,
        @Param("id", ParseIntPipe) id: number,
    ): Promise<void> {
        return this.tarefasService.remove(req.user.id, id);
    }
}
