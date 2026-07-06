import { IsNotEmpty, IsString } from "class-validator";

export class TagsUpdateDto{
    @IsString()
    @IsNotEmpty()
    name!: string;
}