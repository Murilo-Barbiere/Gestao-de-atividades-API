import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ITagsRepository } from './repository/itags.repository';
import { TagsCreateDto } from './dto/tags.create.dto';
import { TagsResponseDto } from './dto/tags.response.dto';
import { TagsUpdateDto } from './dto/tags.update.dto';
import { TagsEntity } from './entity/tags.entity';

@Injectable()
export class TagsService {
    constructor(private tagsRepository: ITagsRepository){}

    async criar(tagsCreateDto: TagsCreateDto, idUserCriador: number): Promise<TagsResponseDto>{
        return this.tagsRepository.create(tagsCreateDto, idUserCriador);
    }

    async retornarById(id_tag: number): Promise<TagsResponseDto>{
        const tag: TagsEntity | null = await this.tagsRepository.findById(id_tag);
        if(!tag) throw new NotFoundException();

        return tag;
    }

    async retornarByName(name: string): Promise<TagsResponseDto | null>{
        const tag: TagsEntity | null = await this.tagsRepository.findName(name);

        if(!tag) return null;

        return tag;
    }
    
    async retornarTodos(): Promise<TagsResponseDto[]>{
        return this.tagsRepository.findMany();
    }

    async retornaTagsDoCriador(id_user: number): Promise<TagsResponseDto[]>{
        return this.tagsRepository.findByuserId(id_user);
    }

    async update(id_tag: number, id_user: number, tagsUpdateDto: TagsUpdateDto): Promise<TagsResponseDto>{
        const tag: TagsEntity | null = await this.tagsRepository.findById(id_tag);
        if(!tag) throw new NotFoundException();

        if(id_user != tag.idUserCriador) throw new UnauthorizedException();

        return this.tagsRepository.update(id_tag, tagsUpdateDto);
    }

    async datele(id_tag: number, id_user: number): Promise<void>{
        const tag: TagsEntity | null = await this.tagsRepository.findById(id_tag);
        if(!tag) throw new NotFoundException();

        if(id_user != tag.idUserCriador) throw new UnauthorizedException();
        
        this.tagsRepository.delete(id_tag);
    }
}
