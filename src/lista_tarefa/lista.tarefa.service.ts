import { Injectable } from '@nestjs/common';
import { CreateListaTarefaDto } from './dto/create.lista.tarefa.dto';
import { IListaTarefaRepository } from './repository/ilista.tarefas.repository';
import { ResponseListaTarefaDto } from './dto/response.lista.tarefa.dto';

@Injectable()
export class ListaTarefaService {

  constructor(private ilistaTarefaRepository: IListaTarefaRepository){}

  async criar(idUserAuth: number, createListaTarefaDto: CreateListaTarefaDto): Promise<ResponseListaTarefaDto> {
    return await this.ilistaTarefaRepository.create({
      nome: createListaTarefaDto.nome,
      user_id: idUserAuth
    });
  }

  async findAll() {
    return `This action returns all listaTarefa`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} listaTarefa`;
  }
/*
  async update(id: number, updateListaTarefaDto: UpdateListaTarefaDto) {
    return `This action updates a #${id} listaTarefa`;
  }
*/
  async remove(id: number) {
    return `This action removes a #${id} listaTarefa`;
  }
}
