import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { ListaTarefaModule } from './lista_tarefa/lista_tarefa.module';
import { TarefasModule } from './tarefas/tarefas.module';
import { TagsModule } from './tags/tags.module';

@Module({
  imports: [
    PrismaModule, 
    AuthModule, 
    UsersModule,
    ConfigModule.forRoot({isGlobal: true,}),
    ListaTarefaModule,
    TarefasModule,
    TagsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
