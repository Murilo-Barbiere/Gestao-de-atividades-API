import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateProjetoDto {
    @IsNotEmpty()
    @IsString()
    nome?: string;
}
