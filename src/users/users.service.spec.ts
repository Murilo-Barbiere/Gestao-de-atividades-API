import { UnauthorizedException, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let usersService: UsersService;
  let mockUserRepository: any;
  let mockConfigService: any;

  beforeEach(() => {
    mockUserRepository = {
      findByEmail: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    mockConfigService = {
      getOrThrow: jest.fn().mockReturnValue(4),
    };

    usersService = new UsersService(mockUserRepository, mockConfigService);
  });

  describe('retornaUserAuthId', () => {
    it('deve retornar o usuário quando o id solicitado é o mesmo do usuário autenticado', async () => {
      const usuarioFake = { id: 1, name: 'ex', email: 'ex@teste.com' };
      mockUserRepository.findById.mockResolvedValue(usuarioFake);

      const resultado = await usersService.retornaUserAuthId(1, 1);

      expect(resultado).toEqual(usuarioFake);
      expect(mockUserRepository.findById).toHaveBeenCalledWith(1);
    });

    it('deve lançar UnauthorizedException quando o id solicitado é diferente do usuário autenticado', async () => {
      await expect(usersService.retornaUserAuthId(1, 2)).rejects.toThrow(
        UnauthorizedException,
      );

      expect(mockUserRepository.findById).not.toHaveBeenCalled();
    });
  });

  describe('upDateId', () => {
    it('deve atualizar o usuário quando o id bate com o usuário autenticado', async () => {
      const usuarioAtualizado = { id: 1, name: 'Novo Nome', email: 'novo@teste.com' };
      mockUserRepository.update.mockResolvedValue(usuarioAtualizado);

      const resultado = await usersService.upDateId(1, 1, {
        name: 'Novo Nome',
        email: 'novo@teste.com',
        senha: '123456',
      } as any);

      expect(resultado).toEqual(usuarioAtualizado);
      expect(mockUserRepository.update).toHaveBeenCalledWith(
        1,
        expect.objectContaining({ name: 'Novo Nome', email: 'novo@teste.com' }),
      );
    });

    it('deve lançar UnauthorizedException quando o id não bate com o usuário autenticado', async () => {
      await expect(
        usersService.upDateId(1, 2, { name: 'x', email: 'x@x.com', senha: '123' } as any),
      ).rejects.toThrow(UnauthorizedException);

      expect(mockUserRepository.update).not.toHaveBeenCalled();
    });
  });

  describe('deleteUserById', () => {
    it('deve deletar o usuário quando o id bate com o usuário autenticado', async () => {
      mockUserRepository.delete.mockResolvedValue(undefined);

      await usersService.deleteUserById(1, 1);

      expect(mockUserRepository.delete).toHaveBeenCalledWith(1);
    });

    it('deve lançar UnauthorizedException quando o id não bate com o usuário autenticado', async () => {
      await expect(usersService.deleteUserById(1, 2)).rejects.toThrow(
        UnauthorizedException,
      );

      expect(mockUserRepository.delete).not.toHaveBeenCalled();
    });

    it('deve lançar NotFoundException quando o repositório falha ao deletar', async () => {
      mockUserRepository.delete.mockRejectedValue(new Error('não encontrado'));

      await expect(usersService.deleteUserById(1, 1)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
