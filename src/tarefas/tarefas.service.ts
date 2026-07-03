import { ITarefaRepository } from './repository/itarefa.repository';
import { TarefaCreateDto } from './dto/tarefa.create.dto';
import { TarefaResponseDto } from './dto/tarefa.response.dto';
import { ListaTarefaService } from '../lista_tarefa/lista_tarefa.service';
import { Injectable, UnauthorizedException} from '@nestjs/common';
import { TarefaEntity } from './entity/tarefa.entity';
import { TarefaUpdataDto } from './dto/tarefa.update.dto';
import { BuscarTarefasQueryDto } from './dto/buscar_tarefas_query.dto';
import { ListaTarefaEntity } from 'src/lista_tarefa/entity/lista.tarefa.entity';
import { IListaTarefaRepository } from 'src/lista_tarefa/repository/ilista.tarefas.repository';
import { TarefaFiltro } from './repository/tarefa.filtro';

@Injectable()
export class TarefasService {
    constructor(
        private tarefaRepository: ITarefaRepository,
        private listaTarefaService: ListaTarefaService,
        private listaTarefaRepository: IListaTarefaRepository    
    ){}

    async create(idUserAuth: number, tarefaCreateDto: TarefaCreateDto): Promise<TarefaResponseDto>{
        if(! await this.isAuthorized(tarefaCreateDto.idList, idUserAuth)) throw new UnauthorizedException();

        return await this.tarefaRepository.create(tarefaCreateDto);
    }

    async retorneTarefasDaLista(
        idUserAuth: number,
        idLista: number,
        query: BuscarTarefasQueryDto
    ): Promise<TarefaResponseDto[]>{
        await this.listaTarefaService.retornePorId(idLista, idUserAuth);

            const filtro: TarefaFiltro = {
                idLista,
                status: query.status,
                prioridade: query.prioridade,
                ordenarPor: query.sort,
                direcao: query.order ?? 'asc',
            };  

        const tarefas = await this.tarefaRepository.findByListaId(filtro);
        return tarefas.map(tarefa => this.toResponseDto(tarefa));
    }

    async retornePorId(idUserAuth: number, idTarefa: number): Promise<TarefaResponseDto> {
        const tarefa: TarefaEntity = await this.tarefaRepository.findById(idTarefa);
        if(! await this.isAuthorized(tarefa.lista_id, idUserAuth)) throw new UnauthorizedException();

        return this.toResponseDto(tarefa);
    }

    async update(idUserAuth: number, idTarefa: number, tarefaUpdataDto: TarefaUpdataDto): Promise<TarefaResponseDto> {
        const tarefa: TarefaEntity = await this.tarefaRepository.findById(idTarefa);
        if(! await this.isAuthorized(tarefa.lista_id, idUserAuth)) throw new UnauthorizedException();

        const tarefaAtualizada = await this.tarefaRepository.update(idTarefa, tarefaUpdataDto);
        return this.toResponseDto(tarefaAtualizada);
    }

    async remove(idUserAuth: number, idTarefa: number): Promise<void> {
        const tarefa: TarefaEntity = await this.tarefaRepository.findById(idTarefa);
        if(! await this.isAuthorized(tarefa.lista_id, idUserAuth)) throw new UnauthorizedException();

        await this.tarefaRepository.delete(idTarefa);
    }

    private toResponseDto(tarefa: TarefaEntity): TarefaResponseDto {
        return {
            id: tarefa.id,
            titulo: tarefa.titulo,
            realizada: tarefa.realizada,
            lista_id: tarefa.lista_id,
            data_vencimento: tarefa.data_vencimento,
            prioridade: tarefa.prioridade,
            vencido: tarefa.vencido
        };
    }

    private async isAuthorized(idLista: number, idUserAuth: number): Promise<boolean>{
        const lista: ListaTarefaEntity = await this.listaTarefaRepository.findById(idLista);
        if(lista.userId == idUserAuth) return true;

        return false;
    }
}
