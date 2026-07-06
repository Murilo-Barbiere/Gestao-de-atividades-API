import { IsNotEmpty, IsString } from "class-validator";

export class TagsCreateDto{
    @IsString()
    @IsNotEmpty()
    name!: string;
}