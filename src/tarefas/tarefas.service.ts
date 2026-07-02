import { ITarefaRepository } from './repository/itarefa.repository';
import { TarefaCreateDto } from './dto/tarefa.create.dto';
import { TarefaResponseDto } from './dto/tarefa.response.dto';
import { ListaTarefaService } from '../lista_tarefa/lista_tarefa.service';
import { Injectable} from '@nestjs/common';
import { TarefaEntity } from './entity/tarefa.entity';
import { TarefaUpdataDto } from './dto/tarefa.update.dto';
import { BuscarTarefasQueryDto } from './dto/buscar_tarefas_query.dto';
import { StatusFiltro } from 'src/common/enums/status_filtro.enum';
import { Prisma } from 'generated/prisma/client';
import { TarefaOrdenacao } from 'src/common/enums/tarefa_ordenacao.enum';

@Injectable()
export class TarefasService {
    constructor(private tarefaRepository: ITarefaRepository, private listaTarefaService: ListaTarefaService){}

    async create(idUserAuth: number, tarefaCreateDto: TarefaCreateDto): Promise<TarefaResponseDto>{
        await this.listaTarefaService.retornePorId(tarefaCreateDto.idList, idUserAuth);
        return await this.tarefaRepository.create(tarefaCreateDto);
    }

    async retorneTarefasDaLista(
        idUserAuth: number,
        idLista: number,
        query: BuscarTarefasQueryDto
    ): Promise<TarefaResponseDto[]>{
        await this.listaTarefaService.retornePorId(idLista, idUserAuth);

        const where = this.whereFiltro(idLista, query);
        const orderBy = this.OrderByFiltro(query);

        const tarefas = await this.tarefaRepository.findByListaId({ where, orderBy });
        return tarefas.map(tarefa => this.toResponseDto(tarefa));
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

    private whereFiltro(idLista: number, query: BuscarTarefasQueryDto): Prisma.tarefaWhereInput{
        const where: Prisma.tarefaWhereInput = { lista_id: idLista };

        switch (query.status) {
            case StatusFiltro.PENDENTE:
                where.realizada = false;
                break;
            case StatusFiltro.CONCLUIDA:
                where.realizada = true;
                break;
            case StatusFiltro.VENCIDA:
                where.realizada = false;
                where.data_vencimento = { lt: new Date() };
                break;
        }

        if (query.prioridade) where.prioridade = query.prioridade;
        return where;
    }

    private OrderByFiltro(query: BuscarTarefasQueryDto): Prisma.tarefaOrderByWithRelationInput | undefined {
        if (!query.sort) return undefined;

        const direction = query.order ?? "asc";

        const sortMap: Record<TarefaOrdenacao, Prisma.tarefaOrderByWithRelationInput> = {
            [TarefaOrdenacao.PRIORIDADE]: { prioridade: direction },
            [TarefaOrdenacao.DATA_CRIACAO]: { id: direction },
            [TarefaOrdenacao.DATA_VENCIMENTO]: { data_vencimento: direction },
            [TarefaOrdenacao.TITULO]: { titulo: direction },
        };

        return sortMap[query.sort];
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
    
}
