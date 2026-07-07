import { UserEntity } from "src/users/entity/user.entity";
import { CreateProjetoDto } from "../dto/create.projeto.dto";
import { UpdateProjetoDto } from "../dto/update.projeto.dto";
import { ProjetoEntity } from "../entity/projeto.entity";

export abstract class IProjetoRepository{
    abstract findById(id: number): Promise<ProjetoEntity>;
    abstract findByMany(): Promise<ProjetoEntity[]>;
    abstract findByUsersId(idUser: number): Promise<ProjetoEntity[]>;
    abstract findUserById(idProjeto: number, idUser: number): Promise<UserEntity | null>;
    abstract findUsersByProjeto(idProjeto: number): Promise<UserEntity[]>
    abstract create(data: CreateProjetoDto): Promise<ProjetoEntity>;
    abstract adicionarParticipante(idProjeto: number, idUser: number): Promise<void>
    abstract update(id: number, data: UpdateProjetoDto): Promise<ProjetoEntity>;
    abstract delete(id: number): Promise<void>;
    abstract removerParticipante(idProjeto: number, idUser: number): Promise<void>
}