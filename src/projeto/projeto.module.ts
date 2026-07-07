import { Module } from '@nestjs/common';
import { ProjetoService } from './projeto.service';
import { ProjetoController } from './projeto.controller';
import { ProjetoRepository } from './repository/projeto.repository';
import { IProjetoRepository } from './repository/iprojeto.repository';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule],
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
