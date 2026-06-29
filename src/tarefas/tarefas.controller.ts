import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Request } from '@nestjs/common';
import { TarefaResponseDto } from './dto/tarefa.response.dto';
import type { RequestWithUser } from 'src/auth/interfaces/request-with-user.interface';
import { TarefasService } from './tarefas.service';
import { TarefaCreateDto } from './dto/tarefa.create.dto';
import { TarefaUpdataDto } from './dto/tarefa.update.dto';

@Controller('tarefas')
export class TarefasController {
    constructor(private tarefasService: TarefasService){}

    @Get("all/:idLista")
    async retorneTarefasDaLista(
        @Request() req: RequestWithUser,
        @Param("idLista", ParseIntPipe) idLista: number)
    : Promise<TarefaResponseDto[]>{
        return this.tarefasService.retorneTarefasDaLista(req.user.id, idLista);
    }
    
    @Get("/:idTarefa")
    async retorneTarefa(@Request() req: RequestWithUser, @Param("idTarefa", ParseIntPipe) idTarefa: number)
    : Promise<TarefaResponseDto>{
        return this.tarefasService.retornePorId(req.user.id, idTarefa);
    }

    @Post(":idLista")
    async criarTarefa(
        @Request() req: RequestWithUser, 
        @Body() tarefaCreateDto: TarefaCreateDto,
        @Param("idLista") idLista: number
    ): Promise<TarefaResponseDto>{
        return this.tarefasService.create(req.user.id, idLista, tarefaCreateDto);
    }

    @Patch(":id")
    async atualizarTarefa(
        @Request() req: RequestWithUser,
        @Param("id", ParseIntPipe) id: number,
        @Body() tarefaUpdataDto: TarefaUpdataDto,
    ): Promise<TarefaResponseDto> {
        return this.tarefasService.update(req.user.id, id, tarefaUpdataDto);
    }

    @Delete(":id")
    async removerTarefa(
        @Request() req: RequestWithUser,
        @Param("id", ParseIntPipe) id: number,
    ): Promise<void> {
        return this.tarefasService.remove(req.user.id, id);
    }
}
