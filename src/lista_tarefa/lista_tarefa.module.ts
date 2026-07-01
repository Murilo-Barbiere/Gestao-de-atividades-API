import { Module } from '@nestjs/common';
import { ListaTarefaService } from './lista_tarefa.service';
import { ListaTarefaController } from './lista_tarefa.controller';
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
  exports: [ListaTarefaService],
})
export class ListaTarefaModule {}
