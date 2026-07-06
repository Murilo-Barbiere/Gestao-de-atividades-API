import { TarefaCreateDto } from "../dto/tarefa.create.dto";
import { TarefaUpdataDto } from "../dto/tarefa.update.dto";
import { TarefaEntity } from "../entity/tarefa.entity";
import { TarefaFiltro } from "./itarefa.filtro";

export abstract class ITarefaRepository{
    abstract findById(id: number): Promise<TarefaEntity>;
    abstract findByListaId(filtro: TarefaFiltro): Promise<TarefaEntity[]>;
    abstract create(data: TarefaCreateDto): Promise<TarefaEntity>;
    abstract update(id: number, data: TarefaUpdataDto): Promise<TarefaEntity>;
    abstract delete(id: number): Promise<void>;
    abstract adicionarTag(idTarefa: number, idTag: number): Promise<void>;
}