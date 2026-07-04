import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class TagsCreateDto{
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsNumber()
    @IsNotEmpty()
    idUserCriador!: number;
}