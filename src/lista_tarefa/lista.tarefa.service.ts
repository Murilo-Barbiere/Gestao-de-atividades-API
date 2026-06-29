import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateListaTarefaDto } from './dto/create.lista.tarefa.dto';
import { IListaTarefaRepository } from './repository/ilista.tarefas.repository';
import { ResponseListaTarefaDto } from './dto/response.lista.tarefa.dto';
import { ListaTarefaEntity } from './entity/lista.tarefa.entity';
import { UpdateListaTarefaDto } from './dto/update.lista.tarefa.dto';

@Injectable()
export class ListaTarefaService {

  constructor(private listaTarefaRepository: IListaTarefaRepository){}

  async criar(idUserAuth: number, createListaTarefaDto: CreateListaTarefaDto): Promise<ResponseListaTarefaDto> {
    return await this.listaTarefaRepository.create({
      nome: createListaTarefaDto.nome,
      user_id: idUserAuth
    });
  }

  async retornePorId(idlista: number, idUserAuth: number){
    const lista: ListaTarefaEntity = await this.listaTarefaRepository.findById(idlista);

    if(lista.userId != idUserAuth) throw new UnauthorizedException();

    return await this.listaTarefaRepository.findById(idlista);
  }

  async ListasDeTarefaDoUsuario(idUserAuth: number): Promise<ResponseListaTarefaDto[]> {
    return await this.listaTarefaRepository.findByUsersId(idUserAuth);
  }
  

  async update(idUserAuth: number, idLista: number, updateListaTarefaDto: UpdateListaTarefaDto)
  : Promise<ResponseListaTarefaDto> {
    const lista: ListaTarefaEntity = await this.listaTarefaRepository.findById(idLista);
    if(lista.userId != idUserAuth) throw new UnauthorizedException();
    
    return await this.listaTarefaRepository.update(idLista, updateListaTarefaDto);
  }
    
  async remove(idUserAuth: number, idLista: number): Promise<void> {
    const lista: ListaTarefaEntity = await this.listaTarefaRepository.findById(idLista);
    if(lista.userId != idUserAuth) throw new UnauthorizedException();

    return await this.listaTarefaRepository.delete(idLista);
  }
}
