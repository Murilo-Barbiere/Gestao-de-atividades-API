import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { ProjetoModule } from './projeto/projeto.module';
import { AtividadeModule } from './atividade/atividade.module';
import { TagsModule } from './tags/tags.module';

@Module({
  imports: [
    PrismaModule, 
    AuthModule, 
    UsersModule,
    ConfigModule.forRoot({isGlobal: true,}),
    ProjetoModule,
    AtividadeModule,
    TagsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
