import { Module } from '@nestjs/common';
import { ProjetoService } from './projeto.service';
import { ProjetoController } from './projeto.controller';
import { ProjetoRepository } from './repository/projeto.repository';
import { IProjetoRepository } from './repository/iprojeto.repository';

@Module({
  controllers: [ProjetoController],
  providers: [
    ProjetoService,
    {
      provide: IProjetoRepository,
      useClass: ProjetoRepository,
    },
  ],
  exports: [ProjetoService, IProjetoRepository],
})
export class ProjetoModule {}
