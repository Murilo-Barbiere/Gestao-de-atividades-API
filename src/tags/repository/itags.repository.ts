import { TagsCreateDto } from "../dto/tags.create.dto";
import { TagsUpdateDto } from "../dto/tags.update.dto";
import { TagsEntity } from "../entity/tags.entity";

export abstract class ITagsRepository{
    abstract findById(id: number): Promise<TagsEntity>;
    abstract findName(name: string): Promise<TagsEntity>;
    abstract findMany(): Promise<TagsEntity[]>;
    abstract findByuserId(user_id: number): Promise<TagsEntity[]>;
    abstract create(data: TagsCreateDto): Promise<TagsEntity>;
    abstract update(id: number, data: TagsUpdateDto): Promise<TagsEntity>;
    abstract delete(id: number): Promise<void>;
}