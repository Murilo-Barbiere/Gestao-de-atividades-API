import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTarafaDto } from './dto/createTarafa.dto';

@Injectable()
export class TarefasService {
  constructor(private prismaService: PrismaService) {}

  async addNewTarefa(createTarafaDto: CreateTarafaDto) {
    return await this.prismaService.tarefa.create({
      data: {
        name: createTarafaDto.name,
        descricao: createTarafaDto.descricao,
        user_id: createTarafaDto.user_id,
      },
    });
  }

  async listAll() {
    return await this.prismaService.tarefa.findMany();
  }
}
