import { CreateListaTarefaRepositoryDto } from "../dto/create.lista.tarefa.repository.dto";
import { UpdateListaTarefaDto } from "../dto/update.lista.tarefa.dto";
import { ListaTarefaEntity } from "../entity/lista.tarefa.entity";

export abstract class IListaTarefaRepository{
    abstract findById(id: number): Promise<ListaTarefaEntity>;
    abstract findByUsersId(idUser: number): Promise<ListaTarefaEntity[]>;
    abstract findByMany(): Promise<ListaTarefaEntity[]>;
    abstract create(data: CreateListaTarefaRepositoryDto): Promise<ListaTarefaEntity>;
    abstract update(id: number, data: UpdateListaTarefaDto): Promise<ListaTarefaEntity>;
    abstract delete(id: number): Promise<void>;
}