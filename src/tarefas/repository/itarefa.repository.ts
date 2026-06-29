import { TarefaCreateDto } from "../dto/tarefa.create.dto";
import { TarefaUpdataDto } from "../dto/tarefa.update.dto";
import { TarefaEntity } from "../entity/tarefa.entity";

export abstract class ITarefaRepository{
    abstract findById(id: number): Promise<TarefaEntity>;
    abstract findByListaId(id: number): Promise<TarefaEntity>;
    abstract create(data: TarefaCreateDto, idLista: number): Promise<TarefaEntity>;
    abstract update(id: number, data: TarefaUpdataDto): Promise<TarefaEntity>;
    abstract delete(id: number): Promise<void>;    
}