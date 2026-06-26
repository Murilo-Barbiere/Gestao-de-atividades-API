import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { TarefaModulo } from './tarefas/tarefas.module';

@Module({
  imports: [PrismaModule, TarefaModulo],
  controllers: [],
  providers: [],
})
export class AppModule {}
