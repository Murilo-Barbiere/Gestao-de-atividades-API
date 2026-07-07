import { AtividadeCreateDto } from "../dto/atividade.create.dto";
import { AtividadeUpdateDto } from "../dto/atividade.update.dto";
import { AtividadeEntity } from "../entity/atividade.entity";
import { AtividadeFiltro } from "./iatividade.filtro";

export abstract class IAtividadeRepository{
    abstract findById(id: number): Promise<AtividadeEntity>;
    abstract findByListaId(filtro: AtividadeFiltro): Promise<AtividadeEntity[]>;
    abstract create(data: AtividadeCreateDto): Promise<AtividadeEntity>;
    abstract update(id: number, data: AtividadeUpdateDto): Promise<AtividadeEntity>;
    abstract delete(id: number): Promise<void>;
    abstract adicionarTag(idTarefa: number, idTag: number): Promise<void>;
}