import { UnauthorizedException } from '@nestjs/common';
import { ListaTarefaService } from './lista.tarefa.service';

describe('ListaTarefaService', () => {
  let listaTarefaService: ListaTarefaService;
  let mockListaTarefaRepository: any;

  beforeEach(() => {
    mockListaTarefaRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      findByUsersId: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    listaTarefaService = new ListaTarefaService(mockListaTarefaRepository);
  });

  describe('criar', () => {
    it('deve criar a lista já vinculada ao usuário autenticado', async () => {
      const listaCriada = { id: 1, nome: 'Compras', userId: 10 };
      mockListaTarefaRepository.create.mockResolvedValue(listaCriada);

      const resultado = await listaTarefaService.criar(10, { nome: 'Compras' });

      expect(mockListaTarefaRepository.create).toHaveBeenCalledWith({
        nome: 'Compras',
        user_id: 10,
      });
      expect(resultado).toEqual(listaCriada);
    });
  });

  describe('retornePorId', () => {
    it('deve retornar a lista quando o usuário autenticado é o dono', async () => {
      mockListaTarefaRepository.findById.mockResolvedValue({ id: 1, nome: 'Compras', userId: 10 });

      const resultado = await listaTarefaService.retornePorId(1, 10);

      expect(resultado.nome).toBe('Compras');
    });

    it('deve lançar UnauthorizedException quando a lista pertence a outro usuário', async () => {
      mockListaTarefaRepository.findById.mockResolvedValue({ id: 1, nome: 'Compras', userId: 999 });

      await expect(listaTarefaService.retornePorId(1, 10)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });

  describe('remove', () => {
    it('deve remover a lista quando o usuário autenticado é o dono', async () => {
      mockListaTarefaRepository.findById.mockResolvedValue({ id: 1, nome: 'Compras', userId: 10 });

      await listaTarefaService.remove(10, 1);

      expect(mockListaTarefaRepository.delete).toHaveBeenCalledWith(1);
    });

    it('não deve remover a lista quando o usuário autenticado não é o dono', async () => {
      mockListaTarefaRepository.findById.mockResolvedValue({ id: 1, nome: 'Compras', userId: 999 });

      await expect(listaTarefaService.remove(10, 1)).rejects.toThrow(
        UnauthorizedException,
      );
      expect(mockListaTarefaRepository.delete).not.toHaveBeenCalled();
    });
  });
});
