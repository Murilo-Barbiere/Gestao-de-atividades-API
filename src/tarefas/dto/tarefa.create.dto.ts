import { IsNotEmpty, IsString } from "class-validator";

export class TarefaCreateDto{
    @IsString()
    @IsNotEmpty()
    titulo!: string;
}