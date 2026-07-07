import { AtividadeService } from './atividade.service';

describe('AtividadeService', () => {
  let tarefasService: AtividadeService;
  let mockTarefaRepository: any;
  let mockListaTarefaService: any;

  beforeEach(() => {
    mockTarefaRepository = {
      create: jest.fn(),
      findByListaId: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    mockListaTarefaService = {
      retornePorId: jest.fn().mockResolvedValue({ id: 1, nome: 'Projeto', userId: 10 }),
    };

    tarefasService = new AtividadeService(mockTarefaRepository, mockListaTarefaService, null as any);
  });

  describe('create', () => {
    it('deve validar a posse da lista antes de criar a tarefa', async () => {
      const tarefaCriada = { id: 1, titulo: 'Estudar', realizada: false, projeto_id: 1 };
      mockTarefaRepository.create.mockResolvedValue(tarefaCriada);

      const resultado = await tarefasService.create(10, { titulo: 'Estudar', idProjeto: 1 } as any);

      expect(mockListaTarefaService.retornePorId).toHaveBeenCalledWith(1);
      expect(mockTarefaRepository.create).toHaveBeenCalled();
      expect(resultado).toEqual(tarefaCriada);
    });

    it('não deve criar a tarefa se o usuário não for dono da lista', async () => {
      mockListaTarefaService.retornePorId.mockRejectedValue(new Error('Não autorizado'));

      await expect(
        tarefasService.create(99, { titulo: 'Estudar', idProjeto: 1 } as any),
      ).rejects.toThrow();

      expect(mockTarefaRepository.create).not.toHaveBeenCalled();
    });
  });

  describe('retornePorId', () => {
    it('deve retornar a tarefa quando o usuário é dono da lista que a contém', async () => {
      mockTarefaRepository.findById.mockResolvedValue({
        id: 5,
        titulo: 'Lavar louça',
        realizada: false,
        projeto_id: 1,
      });

      const resultado = await tarefasService.retornePorId(10, 5);

      expect(mockListaTarefaService.retornePorId).toHaveBeenCalledWith(1);
      expect(resultado.titulo).toBe('Lavar louça');
    });

    it('deve propagar o erro quando o usuário não é dono da lista da tarefa', async () => {
      mockTarefaRepository.findById.mockResolvedValue({
        id: 5,
        titulo: 'Lavar louça',
        realizada: false,
        projeto_id: 1,
      });
      mockListaTarefaService.retornePorId.mockRejectedValue(new Error('Não autorizado'));

      await expect(tarefasService.retornePorId(99, 5)).rejects.toThrow();
    });
  });

  describe('remove', () => {
    it('deve remover a tarefa somente depois de confirmar a posse da lista', async () => {
      mockTarefaRepository.findById.mockResolvedValue({
        id: 5,
        titulo: 'Lavar louça',
        realizada: false,
        projeto_id: 1,
      });

      await tarefasService.remove(10, 5);

      expect(mockListaTarefaService.retornePorId).toHaveBeenCalledWith(1);
      expect(mockTarefaRepository.delete).toHaveBeenCalledWith(5);
    });
  });
});
