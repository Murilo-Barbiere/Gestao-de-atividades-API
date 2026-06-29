import { Body, Controller, Param, Post, Request } from '@nestjs/common';
import { TarefaResponseDto } from './dto/tarefa.response.dto';
import type { RequestWithUser } from 'src/auth/interfaces/request-with-user.interface';
import { TarefasService } from './tarefas.service';
import { TarefaCreateDto } from './dto/tarefa.create.dto';

@Controller('tarefas')
export class TarefasController {
    constructor(private tarefasService: TarefasService){}

    @Post(":idLista")
    criarTarefa(
        @Request() req: RequestWithUser, 
        @Body() tarefaCreateDto: TarefaCreateDto,
        @Param("idLista") idLista: number
    ): Promise<TarefaResponseDto>{
        return this.tarefasService.create(req.user.id, idLista, tarefaCreateDto);
    }

}
