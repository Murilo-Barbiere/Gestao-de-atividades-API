import { CreateProjetoRepositoryDto } from "../dto/create.projeto.repository.dto";
import { UpdateProjetoDto } from "../dto/update.projeto.dto";
import { ProjetoEntity } from "../entity/projeto.entity";

export abstract class IProjetoRepository{
    abstract findById(id: number): Promise<ProjetoEntity>;
    abstract findByUsersId(idUser: number): Promise<ProjetoEntity[]>;
    abstract findByMany(): Promise<ProjetoEntity[]>;
    abstract create(data: CreateProjetoRepositoryDto): Promise<ProjetoEntity>;
    abstract update(id: number, data: UpdateProjetoDto): Promise<ProjetoEntity>;
    abstract delete(id: number): Promise<void>;
}