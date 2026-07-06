import { TagsCreateDto } from "../dto/tags.create.dto";
import { TagsUpdateDto } from "../dto/tags.update.dto";
import { TagsEntity } from "../entity/tags.entity";

export abstract class ITagsRepository{
    abstract findById(id: number): Promise< TagsEntity | null>;
    abstract findName(name: string): Promise<TagsEntity | null>;
    abstract findMany(): Promise<TagsEntity[]>;
    abstract findByuserId(user_id: number): Promise<TagsEntity[]>;
    abstract create(data: TagsCreateDto, id_criador: number): Promise<TagsEntity>;
    abstract update(id: number, data: TagsUpdateDto): Promise<TagsEntity>;
    abstract delete(id: number): Promise<void>;
}