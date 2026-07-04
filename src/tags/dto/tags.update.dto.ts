import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class TagsUpdateDto{
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsNumber()
    @IsNotEmpty()
    idUserCriador!: number;
}