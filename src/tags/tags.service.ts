import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ITagsRepository } from './repository/itags.repository';
import { TagsCreateDto } from './dto/tags.create.dto';
import { TagsResponseDto } from './dto/tags.response.dto';
import { TagsUpdateDto } from './dto/tags.update.dto';
import { TagsEntity } from './entity/tags.entity';

@Injectable()
export class TagsService {
    constructor(private tagsRepository: ITagsRepository){}

    async criar(tagsCreateDto: TagsCreateDto): Promise<TagsResponseDto>{
        return this.tagsRepository.create(tagsCreateDto);
    }

    async retornarById(id_tag: number): Promise<TagsResponseDto>{
        return this.tagsRepository.findById(id_tag);
    }

    async retornarByName(name: string): Promise<TagsResponseDto>{
        return this.tagsRepository.findName(name);
    }
    
    async retornarTodos(): Promise<TagsResponseDto[]>{
        console.log("1")
        return this.tagsRepository.findMany();
    }

    async retornaTagsDoCriador(id_user: number): Promise<TagsResponseDto[]>{
        return this.tagsRepository.findByuserId(id_user);
    }

    async update(id_tag: number, id_user: number, tagsUpdateDto: TagsUpdateDto): Promise<TagsResponseDto>{
        const tag: TagsEntity = await this.tagsRepository.findById(id_tag)
        if(id_user != tag.idUserCriador) throw new UnauthorizedException();

        return this.tagsRepository.update(id_tag, tagsUpdateDto);
    }

    async datele(id_tag: number, id_user: number): Promise<void>{
        const tag = await this.tagsRepository.findById(id_tag)
        if(id_user != tag.idUserCriador) throw new UnauthorizedException();
        
        this.tagsRepository.delete(id_tag);
    }
}
