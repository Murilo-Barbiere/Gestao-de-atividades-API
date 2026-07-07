import { UnauthorizedException } from '@nestjs/common';
import { ProjetoService } from './projeto.service';

describe('ProjetoService', () => {
  let projetoService: ProjetoService;
  let mockProjetoRepository: any;

  beforeEach(() => {
    mockProjetoRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      findByUsersId: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    projetoService = new ProjetoService(mockProjetoRepository);
  });

  describe('criar', () => {
    it('deve criar a lista já vinculada ao usuário autenticado', async () => {
      const listaCriada = { id: 1, nome: 'Compras', userId: 10 };
      mockProjetoRepository.create.mockResolvedValue(listaCriada);

      const resultado = await projetoService.criar(10, { nome: 'Compras' });

      expect(mockProjetoRepository.create).toHaveBeenCalledWith({
        nome: 'Compras',
        user_id: 10,
      });
      expect(resultado).toEqual(listaCriada);
    });
  });

  describe('retornePorId', () => {
    it('deve retornar a lista quando o usuário autenticado é o dono', async () => {
      mockProjetoRepository.findById.mockResolvedValue({ id: 1, nome: 'Compras', userId: 10 });

      const resultado = await projetoService.retornePorId(1);

      expect(resultado.nome).toBe('Compras');
    });
  });

  describe('remove', () => {
    it('deve remover a lista quando o usuário autenticado é o dono', async () => {
      mockProjetoRepository.findById.mockResolvedValue({ id: 1, nome: 'Compras', userId: 10 });

      await projetoService.remove(10, 1);

      expect(mockProjetoRepository.delete).toHaveBeenCalledWith(1);
    });

    it('não deve remover a lista quando o usuário autenticado não é o dono', async () => {
      mockProjetoRepository.findById.mockResolvedValue({ id: 1, nome: 'Compras', userId: 999 });

      await expect(projetoService.remove(10, 1)).rejects.toThrow(
        UnauthorizedException,
      );
      expect(mockProjetoRepository.delete).not.toHaveBeenCalled();
    });
  });
});
