import { Injectable, ConflictException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateProjetoDto } from './dto/create.projeto.dto';
import { IProjetoRepository } from './repository/iprojeto.repository';
import { ResponseProjetoDto } from './dto/response.projeto.dto';
import { UpdateProjetoDto } from './dto/update.projeto.dto';
import { UserEntity } from 'src/users/entity/user.entity';
import { IUserRepository } from 'src/users/repository/iuser.repository';
import { UserResponseDto } from 'src/users/dto/user.response.dto';

@Injectable()
export class ProjetoService {

  constructor(
    private projetoRepository: IProjetoRepository,
    private userRepository:IUserRepository
  ){}

  async criar(idUserAuth: number, createProjetoDto: CreateProjetoDto): Promise<ResponseProjetoDto> {
    const projeto = await this.projetoRepository.create(createProjetoDto);
    await this.projetoRepository.adicionarParticipante(projeto.id, idUserAuth);

    return projeto;
  }

  async addParticipante(idUserAuth: number, idProjeto: number, emailUser: string): Promise<UserResponseDto>{
    if(!(await this.projetoRepository.findUserById(idProjeto, idUserAuth))) throw new UnauthorizedException();

    const user: UserEntity|null = await this.userRepository.findByEmail(emailUser);
    if(!user) throw new NotFoundException("user nao existente");

    if(await this.projetoRepository.findUserById(idProjeto, user.id)){
      throw new ConflictException("Usuário já participa deste projeto");
    }

    await this.projetoRepository.adicionarParticipante(idProjeto, user.id);

    return {
      id: user.id,
      name: user.name,
      email: user.email
    }

  }

  async listarParticipantes(idProjeto: number, idUserAuth: number): Promise<UserResponseDto[]>{
    if(!(await this.projetoRepository.findUserById(idProjeto, idUserAuth))) throw new UnauthorizedException();

    const participantes = await this.projetoRepository.findUsersByProjeto(idProjeto);

    return participantes.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email
    }));
  }

  async removerParticipante(idProjeto: number, idUserAuth: number, idParticipante: number): Promise<void>{
    if(!(await this.projetoRepository.findUserById(idProjeto, idUserAuth))) throw new UnauthorizedException();

    if(!(await this.projetoRepository.findUserById(idProjeto, idParticipante))){
      throw new NotFoundException("Participante não encontrado neste projeto");
    }

    await this.projetoRepository.removerParticipante(idProjeto, idParticipante);
  }

  async retornePorIdAuth(idProjeto: number, idUserAuth: number): Promise<ResponseProjetoDto>{
    if(!(await this.projetoRepository.findUserById(idProjeto, idUserAuth))) throw new UnauthorizedException();

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
    if(!(await this.projetoRepository.findUserById(idProjeto, idUserAuth))) throw new UnauthorizedException();
    
    return await this.projetoRepository.update(idProjeto, updateProjetoDto);
  }
    
  async remove(idUserAuth: number, idProjeto: number): Promise<void> {
    if(!(await this.projetoRepository.findUserById(idProjeto, idUserAuth))) throw new UnauthorizedException();

    return await this.projetoRepository.delete(idProjeto);
  }
}