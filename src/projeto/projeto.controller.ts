import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Req } from '@nestjs/common';
import { ProjetoService } from './projeto.service';
import { CreateProjetoDto } from './dto/create.projeto.dto';
import type { RequestWithUser } from 'src/auth/interfaces/request-with-user.interface';
import { ResponseProjetoDto } from './dto/response.projeto.dto';
import { UpdateProjetoDto } from './dto/update.projeto.dto';

@Controller('projeto')
export class ProjetoController {
  constructor(private readonly projetoService: ProjetoService) {}

  @Post()
  async criarProjeto(
    @Body() createProjetoDto: CreateProjetoDto, 
    @Req() requestUser: RequestWithUser
  ): Promise<ResponseProjetoDto>{
    return await this.projetoService.criar(requestUser.user.id, createProjetoDto);
  }

  @Get()
  async retornaProjetos(@Req() requestUser: RequestWithUser): Promise<ResponseProjetoDto[]>{
    return await this.projetoService.ListasDeTarefaDoUsuario(requestUser.user.id);
  }
  
  @Get(":idProjeto")
  async retornaProjetoPorId(
    @Param("idProjeto", ParseIntPipe) idProjeto: number, 
    @Req() requestUser: RequestWithUser
  ): Promise<ResponseProjetoDto>{
    return await this.projetoService.retornePorIdAuth(idProjeto, requestUser.user.id);
  }
  
  @Put(":idProjeto")
  async updateProjeto(
    @Req() requestUser: RequestWithUser,
    @Param("idProjeto", ParseIntPipe) idProjeto: number,
    @Body() updateProjetoDto: UpdateProjetoDto,
  ): Promise<ResponseProjetoDto>{
    return await this.projetoService.update(requestUser.user.id, idProjeto, updateProjetoDto);
  }

  @Delete(":idProjeto")
  @HttpCode(HttpStatus.NO_CONTENT)
  async deletaProjeto(@Req() requestUser: RequestWithUser, @Param("idProjeto", ParseIntPipe) idProjeto: number,)
  : Promise<void>{
    return await this.projetoService.remove(requestUser.user.id, idProjeto);
  }
}