import { Module } from '@nestjs/common';
import { TarefasService } from './tarefas.service';
import { TarefasController } from './tarefas.controller';
import { ITarefaRepository } from './repository/itarefa.repository';
import { TarefaRepository } from './repository/tarefa.repository';
import { ListaTarefaModule } from '../lista_tarefa/lista.tarefa.module';

@Module({
  imports: [ListaTarefaModule],
  providers: [
    TarefasService,
    {
      provide: ITarefaRepository,
      useClass: TarefaRepository,
    },
  ],
  controllers: [TarefasController]
})
export class TarefasModule {}
