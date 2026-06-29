import { Module } from '@nestjs/common';
import { ListaTarefaService } from './lista.tarefa.service';
import { ListaTarefaController } from './lista.tarefa.controller';
import { ListaTarefaRepository } from './repository/lista.tarefa.repository';
import { IListaTarefaRepository } from './repository/ilista.tarefas.repository';

@Module({
  controllers: [ListaTarefaController],
  providers: [
    ListaTarefaService,
    {
      provide: IListaTarefaRepository,
      useClass: ListaTarefaRepository,
    },
  ],
})
export class ListaTarefaModule {}
