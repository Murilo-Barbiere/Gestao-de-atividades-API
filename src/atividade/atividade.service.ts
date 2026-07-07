import { IAtividadeRepository } from './repository/iatividade.repository';
import { AtividadeCreateDto } from './dto/atividade.create.dto';
import { AtividadeResponseDto } from './dto/atividade.response.dto';
import { ProjetoService } from '../projeto/projeto.service';
import { Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import { AtividadeEntity } from './entity/atividade.entity';
import { AtividadeUpdateDto } from './dto/atividade.update.dto';
import { BuscarAtividadesQueryDto } from './dto/buscar_atividades_query.dto';
import { AtividadeFiltro } from './repository/iatividade.filtro';
import { ResponseProjetoDto } from '../projeto/dto/response.projeto.dto';
import { TagsCreateDto } from '../tags/dto/tags.create.dto';
import { TagsResponseDto } from '../tags/dto/tags.response.dto';
import { TagsService } from '../tags/tags.service';

@Injectable()
export class AtividadeService {
    constructor(
        private atividadeRepository: IAtividadeRepository,
        private projetoService: ProjetoService,
        private tagsService: TagsService     
    ){}

    async create(idUserAuth: number, atividadeCreateDto: AtividadeCreateDto): Promise<AtividadeResponseDto>{
        if(! await this.isAuthorized(atividadeCreateDto.idProjeto, idUserAuth)) throw new UnauthorizedException();

        return await this.atividadeRepository.create(atividadeCreateDto);
    }

    async retorneAtividadesDoProjeto(
        idUserAuth: number,
        idProjeto: number,
        query: BuscarAtividadesQueryDto
    ): Promise<AtividadeResponseDto[]>{
        await this.projetoService.retornePorIdAuth(idProjeto, idUserAuth);

        if(query.tag){
            const tag: TagsResponseDto | null = await this.tagsService.retornarByName(query.tag);
            if(!tag) throw new NotFoundException("tag nao existente");
        }

        const filtro: AtividadeFiltro = {
            idProjeto: idProjeto,
            status: query.status,
            prioridade: query.prioridade,
            ordenarPor: query.sort,
            tag: query.tag,
            direcao: query.order ?? 'asc',
        }; 
        const atividades = await this.atividadeRepository.findByListaId(filtro);
        return atividades.map(atividade => this.toResponseDto(atividade));
    }

    async retornePorId(idUserAuth: number, idAtividade: number): Promise<AtividadeResponseDto> {
        const atividade: AtividadeEntity = await this.atividadeRepository.findById(idAtividade);
        if(! await this.isAuthorized(atividade.projeto_id, idUserAuth)) throw new UnauthorizedException();

        return this.toResponseDto(atividade);
    }

    async update(idUserAuth: number, idAtividade: number, atividadeUpdateDto: AtividadeUpdateDto): Promise<AtividadeResponseDto> {
        const atividade: AtividadeEntity = await this.atividadeRepository.findById(idAtividade);
        if(! await this.isAuthorized(atividade.projeto_id, idUserAuth)) throw new UnauthorizedException();

        const atividadeAtualizada = await this.atividadeRepository.update(idAtividade, atividadeUpdateDto);
        return this.toResponseDto(atividadeAtualizada);
    }

    async remove(idUserAuth: number, idAtividade: number): Promise<void> {
        const atividade: AtividadeEntity = await this.atividadeRepository.findById(idAtividade);
        if(! await this.isAuthorized(atividade.projeto_id, idUserAuth)) throw new UnauthorizedException();

        await this.atividadeRepository.delete(idAtividade);
    }

    async relacionaTagAtividade(idAtividade: number, idUserAuth: number, tagsCreateDto: TagsCreateDto): Promise<TagsResponseDto>{
        const atividade: AtividadeEntity = await this.atividadeRepository.findById(idAtividade);
        if(! await this.isAuthorized(atividade.projeto_id, idUserAuth)) throw new UnauthorizedException();

        let tag: TagsResponseDto | null = await this.tagsService.retornarByName(tagsCreateDto.name);

        if(!tag){
            tag = await this.tagsService.criar(tagsCreateDto, idUserAuth);
        }

        await this.atividadeRepository.adicionarTag(idAtividade, tag.id)
        return tag;
    }

    private toResponseDto(atividade: AtividadeEntity): AtividadeResponseDto {
        return {
            id: atividade.id,
            titulo: atividade.titulo,
            realizada: atividade.realizada,
            projeto_id: atividade.projeto_id,
            data_vencimento: atividade.data_vencimento,
            prioridade: atividade.prioridade,
            vencido: atividade.vencido
        };
    }

    private async isAuthorized(idProjeto: number, idUserAuth: number): Promise<boolean>{
        const projeto: ResponseProjetoDto = await this.projetoService.retornePorId(idProjeto);
        if(projeto.userId == idUserAuth) return true;

        return false;
    }
}