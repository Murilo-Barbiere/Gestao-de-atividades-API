import { Injectable } from '@nestjs/common';
import { ITarefaRepository } from './repository/itarefa.repository';
import { TarefaCreateDto } from './dto/tarefa.create.dto';
import { TarefaResponseDto } from './dto/tarefa.response.dto';
import { ListaTarefaService } from 'src/lista_tarefa/lista.tarefa.service';

@Injectable()
export class TarefasService {
    constructor(private tarefaRepository: ITarefaRepository, private listaTarefaService: ListaTarefaService){}

    async create(idUserAuth: number, idLista: number, tarefaCreateDto: TarefaCreateDto): Promise<TarefaResponseDto>{
        this.listaTarefaService.retornePorId(idLista, idUserAuth);

        return await this.tarefaRepository.create(tarefaCreateDto, idLista);
    }
}
