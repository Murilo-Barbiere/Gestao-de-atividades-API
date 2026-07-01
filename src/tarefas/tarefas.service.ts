import { ITarefaRepository } from './repository/itarefa.repository';
import { TarefaCreateDto } from './dto/tarefa.create.dto';
import { TarefaResponseDto } from './dto/tarefa.response.dto';
import { ListaTarefaService } from '../lista_tarefa/lista_tarefa.service';
import { Injectable} from '@nestjs/common';
import { TarefaEntity } from './entity/tarefa.entity';
import { TarefaUpdataDto } from './dto/tarefa.update.dto';

@Injectable()
export class TarefasService {
    constructor(private tarefaRepository: ITarefaRepository, private listaTarefaService: ListaTarefaService){}

    async create(idUserAuth: number, tarefaCreateDto: TarefaCreateDto, idLista: number): Promise<TarefaResponseDto>{
        await this.listaTarefaService.retornePorId(idLista, idUserAuth);
        return await this.tarefaRepository.create(tarefaCreateDto, idLista);
    }

    async retorneTarefasDaLista(
        idUserAuth: number,
        idLista: number
    ): Promise<TarefaResponseDto[]>{
        await this.listaTarefaService.retornePorId(idLista, idUserAuth);

        return await this.tarefaRepository.findByListaId(idLista);
    }

    async retornePorId(idUserAuth: number, idTarefa: number): Promise<TarefaResponseDto> {
        const tarefa = await this.retorneTarefaAutorizada(idTarefa, idUserAuth);
        return this.toResponseDto(tarefa);
    }

    async update(idUserAuth: number, idTarefa: number, tarefaUpdataDto: TarefaUpdataDto): Promise<TarefaResponseDto> {
        await this.retorneTarefaAutorizada(idTarefa, idUserAuth);

        const tarefaAtualizada = await this.tarefaRepository.update(idTarefa, tarefaUpdataDto);
        return this.toResponseDto(tarefaAtualizada);
    }

    async remove(idUserAuth: number, idTarefa: number): Promise<void> {
        await this.retorneTarefaAutorizada(idTarefa, idUserAuth);

        await this.tarefaRepository.delete(idTarefa);
    }

    private async retorneTarefaAutorizada(idTarefa: number, idUserAuth: number): Promise<TarefaEntity> {
        const tarefa = await this.tarefaRepository.findById(idTarefa);

        await this.listaTarefaService.retornePorId(tarefa.lista_id, idUserAuth);

        return tarefa;
    }

    private toResponseDto(tarefa: TarefaEntity): TarefaResponseDto {
        return {
            id: tarefa.id,
            titulo: tarefa.titulo,
            realizada: tarefa.realizada,
            lista_id: tarefa.lista_id
        };
    }
}
