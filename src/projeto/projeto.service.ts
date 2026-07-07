import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateProjetoDto } from './dto/create.projeto.dto';
import { IProjetoRepository } from './repository/iprojeto.repository';
import { ResponseProjetoDto } from './dto/response.projeto.dto';
import { ProjetoEntity } from './entity/projeto.entity';
import { UpdateProjetoDto } from './dto/update.projeto.dto';

@Injectable()
export class ProjetoService {

  constructor(private projetoRepository: IProjetoRepository){}

  async criar(idUserAuth: number, createProjetoDto: CreateProjetoDto): Promise<ResponseProjetoDto> {
    return await this.projetoRepository.create({
      nome: createProjetoDto.nome,
      user_id: idUserAuth
    });
  }

  async retornePorIdAuth(idProjeto: number, idUserAuth: number): Promise<ResponseProjetoDto>{
    const projeto: ProjetoEntity = await this.projetoRepository.findById(idProjeto);

    if(projeto.userId != idUserAuth) throw new UnauthorizedException();

    return await this.projetoRepository.findById(idProjeto);
  }

  async retornePorId(idProjeto: number): Promise<ResponseProjetoDto>{
    return await this.projetoRepository.findById(idProjeto);
  }

  async ListasDeTarefaDoUsuario(idUserAuth: number): Promise<ResponseProjetoDto[]> {
    return await this.projetoRepository.findByUsersId(idUserAuth);
  }
  
  async retornaTodos(): Promise<ResponseProjetoDto[]>{
    return this.projetoRepository.findByMany();
  }

  async update(idUserAuth: number, idProjeto: number, updateProjetoDto: UpdateProjetoDto)
  : Promise<ResponseProjetoDto> {
    const projeto: ProjetoEntity = await this.projetoRepository.findById(idProjeto);
    if(projeto.userId != idUserAuth) throw new UnauthorizedException();
    
    return await this.projetoRepository.update(idProjeto, updateProjetoDto);
  }
    
  async remove(idUserAuth: number, idProjeto: number): Promise<void> {
    const projeto: ProjetoEntity = await this.projetoRepository.findById(idProjeto);
    if(projeto.userId != idUserAuth) throw new UnauthorizedException();

    return await this.projetoRepository.delete(idProjeto);
  }
}