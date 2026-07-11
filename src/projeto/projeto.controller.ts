import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Req } from '@nestjs/common';
import { ProjetoService } from './projeto.service';
import { CreateProjetoDto } from './dto/create.projeto.dto';
import type { RequestWithUser } from 'src/auth/interfaces/request-with-user.interface';
import { ResponseProjetoDto } from './dto/response.projeto.dto';
import { UpdateProjetoDto } from './dto/update.projeto.dto';
import { NewParticipanteDto } from './dto/new_participante.dto';
import { UserResponseDto } from 'src/users/dto/user.response.dto';
import { ApiTags } from '@nestjs/swagger';
import { ResponseProjetoParticipanteDto } from './dto/response.projetoParticipante.dto';

@Controller('projeto')
@ApiTags('Projeto')
export class ProjetoController {
  constructor(private readonly projetoService: ProjetoService) {}

  @Post()
  async criarProjeto(
    @Body() createProjetoDto: CreateProjetoDto, 
    @Req() requestUser: RequestWithUser
  ): Promise<ResponseProjetoDto>{
    return await this.projetoService.criar(requestUser.user.id, createProjetoDto);
  }

  @Post(":idProjeto/participante")
  async addparticipanteNoProjeto(
    @Req() requestUser: RequestWithUser,
    @Body() newParticipanteDto: NewParticipanteDto,
    @Param("idProjeto", ParseIntPipe) idProjeto: number
  ): Promise<UserResponseDto>{
    return await this.projetoService.addParticipante(requestUser.user.id, idProjeto, newParticipanteDto.email);
  }

  @Get(":idProjeto/participante")
  async retornaParticipantesDoProjeto(
    @Req() requestUser: RequestWithUser,
    @Param("idProjeto", ParseIntPipe) idProjeto: number
  ): Promise<UserResponseDto[]>{
    return await this.projetoService.listarParticipantes(idProjeto, requestUser.user.id);
  }

  @Delete(":idProjeto/participante/:idParticipante")
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeParticipanteDoProjeto(
    @Req() requestUser: RequestWithUser,
    @Param("idProjeto", ParseIntPipe) idProjeto: number,
    @Param("idParticipante", ParseIntPipe) idParticipante: number
  ): Promise<void>{
    console.log(1)
    return await this.projetoService.removerParticipante(idProjeto, requestUser.user.id, idParticipante);
  }

  @Get()
  async retornaProjetos(@Req() requestUser: RequestWithUser): Promise<ResponseProjetoParticipanteDto[]>{
    return await this.projetoService.ListaProjetosDoUsuario(requestUser.user.id);
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