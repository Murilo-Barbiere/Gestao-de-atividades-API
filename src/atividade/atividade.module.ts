import { Module } from '@nestjs/common';
import { AtividadeService } from './atividade.service';
import { AtividadeController } from './atividade.controller';
import { IAtividadeRepository } from './repository/iatividade.repository';
import { AtividadeRepository } from './repository/atividade.repository';
import { ProjetoModule } from '../projeto/projeto.module';
import { TagsModule } from '../tags/tags.module';

@Module({
  imports: [ProjetoModule, TagsModule],
  providers: [
    AtividadeService,
    {
      provide: IAtividadeRepository,
      useClass: AtividadeRepository,
    },
  ],
  controllers: [AtividadeController]
})
export class AtividadeModule {}
