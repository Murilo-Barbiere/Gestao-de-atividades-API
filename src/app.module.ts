import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { TarefaModulo } from './tarefas/tarefas.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    PrismaModule, 
    TarefaModulo, 
    AuthModule, 
    UsersModule,
    ConfigModule.forRoot({isGlobal: true,})
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
