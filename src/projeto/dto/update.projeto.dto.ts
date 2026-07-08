import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateProjetoDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    nome?: string;
}
