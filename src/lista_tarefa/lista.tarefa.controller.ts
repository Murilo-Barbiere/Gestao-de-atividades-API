import { Body, Controller, Post, Req } from '@nestjs/common';
import { ListaTarefaService } from './lista.tarefa.service';
import { CreateListaTarefaDto } from './dto/create.lista.tarefa.dto';
import type { RequestWithUser } from 'src/auth/interfaces/request-with-user.interface';
import { ResponseListaTarefaDto } from './dto/response.lista.tarefa.dto';

@Controller('lista-tarefa')
export class ListaTarefaController {
  constructor(private readonly listaTarefaService: ListaTarefaService) {}

  @Post()
  async criarTarefa(
    @Body() createListaTarefaDto: CreateListaTarefaDto, 
    @Req() requestUser: RequestWithUser
  ): Promise<ResponseListaTarefaDto>{
    return await this.listaTarefaService.criar(requestUser.user.id, createListaTarefaDto);
  }
}
