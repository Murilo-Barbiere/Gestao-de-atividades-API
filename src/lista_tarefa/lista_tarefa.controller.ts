import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Req } from '@nestjs/common';
import { ListaTarefaService } from './lista_tarefa.service';
import { CreateListaTarefaDto } from './dto/create.lista.tarefa.dto';
import type { RequestWithUser } from 'src/auth/interfaces/request-with-user.interface';
import { ResponseListaTarefaDto } from './dto/response.lista.tarefa.dto';
import { UpdateListaTarefaDto } from './dto/update.lista.tarefa.dto';

@Controller('lista-tarefa')
export class ListaTarefaController {
  constructor(private readonly listaTarefaService: ListaTarefaService) {}

  @Post()
  async criarListaTarefa(
    @Body() createListaTarefaDto: CreateListaTarefaDto, 
    @Req() requestUser: RequestWithUser
  ): Promise<ResponseListaTarefaDto>{
    return await this.listaTarefaService.criar(requestUser.user.id, createListaTarefaDto);
  }

  @Get()
  async retornaTarefasDaLista(@Req() requestUser: RequestWithUser): Promise<ResponseListaTarefaDto[]>{
    return await this.listaTarefaService.ListasDeTarefaDoUsuario(requestUser.user.id);
  }
  
  @Get(":idLista")
  async retornaListaTarefaPorId(
    @Param("idLista", ParseIntPipe) idLista: number, 
    @Req() requestUser: RequestWithUser
  ): Promise<ResponseListaTarefaDto>{
    return await this.listaTarefaService.retornePorId(idLista, requestUser.user.id);
  }
  
  @Put(":idLista")
  async upadateListaTarefas(
    @Req() requestUser: RequestWithUser,
    @Param("idLista", ParseIntPipe) idLista: number,
    @Body() updateListaTarefaDto: UpdateListaTarefaDto,
  ): Promise<ResponseListaTarefaDto>{
    return await this.listaTarefaService.update(requestUser.user.id, idLista, updateListaTarefaDto);
  }

  @Delete(":idLista")
  @HttpCode(HttpStatus.NO_CONTENT)
  async deletaListaTarefa(@Req() requestUser: RequestWithUser, @Param("idLista", ParseIntPipe) idLista: number,)
  : Promise<void>{
    return await this.listaTarefaService.remove(requestUser.user.id, idLista);
  }
}
