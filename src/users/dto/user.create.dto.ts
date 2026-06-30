import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTarafaDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsOptional()
  @IsString()
  descricao?: string;
}