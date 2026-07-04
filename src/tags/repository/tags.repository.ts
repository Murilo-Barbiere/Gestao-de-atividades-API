import { PrismaService } from "src/prisma/prisma.service";
import { TagsCreateDto } from "../dto/tags.create.dto";
import { TagsUpdateDto } from "../dto/tags.update.dto";
import { TagsEntity } from "../entity/tags.entity";
import { ITagsRepository } from "./itags.repository";
import { tags } from "generated/prisma/client";
import { Injectable } from "@nestjs/common";

@Injectable()
export class TagsRepository implements ITagsRepository {
    constructor(private prismaService: PrismaService){}
    
    async findById(id: number): Promise<TagsEntity> {
        const tag: tags = await this.prismaService.tags.findUniqueOrThrow({where: {id}});
        return this.toEntity(tag);
    }
    
    async findName(name: string): Promise<TagsEntity> {
        const tag: tags = await this.prismaService.tags.findUniqueOrThrow({where: {name}});
        return this.toEntity(tag);
    }
    
    async findByuserId(user_id: number): Promise<TagsEntity[]> {
        const tags: tags[] = await this.prismaService.tags.findMany({where: { user_id, }});
        return tags.map(tag => this.toEntity(tag));
    }

    async findMany(): Promise<TagsEntity[]>{
        console.log("1")
        const tags: tags[] = await this.prismaService.tags.findMany();
        console.log("1")
        return tags.map(tag => this.toEntity(tag));
    }

    async create(data: TagsCreateDto): Promise<TagsEntity> {
        const tag: tags = await this.prismaService.tags.create({
            data: {
                name: data.name,
                user_id: data.idUserCriador
            }
        });

        return this.toEntity(tag);
    }

    async update(id: number, data: TagsUpdateDto): Promise<TagsEntity> {
        const tag: tags = await this.prismaService.tags.update({
            where:{ id },
            data: {
                name: data.name
            }
        });

        return this.toEntity(tag);
    }

    async delete(id: number): Promise<void> {
        await this.prismaService.tags.delete({where: { id }});
    }

    private toEntity(tag: tags){
        return new TagsEntity(
            tag.id,
            tag.name,
            tag.user_id
        )
    }

}