import bcrypt from 'bcrypt';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  let mockJwtService: any;
  let mockUsersService: any;

  beforeEach(() => {
    mockJwtService = {
      signAsync: jest.fn().mockResolvedValue('token-fake'),
    };

    mockUsersService = {
      retornUserEmail: jest.fn(),
      saveUser: jest.fn(),
    };

    authService = new AuthService(mockJwtService, mockUsersService);
  });

  describe('register', () => {
    it('deve lançar ConflictException se o e-mail já estiver cadastrado', async () => {
      mockUsersService.retornUserEmail.mockResolvedValue({ id: 1, email: 'existe@teste.com' });

      await expect(
        authService.register({ nome: 'ex', email: 'existe@teste.com', senha: '123456' } as any),
      ).rejects.toThrow(ConflictException);

      expect(mockUsersService.saveUser).not.toHaveBeenCalled();
    });

    it('deve criar o usuário quando o e-mail ainda não existe', async () => {
      mockUsersService.retornUserEmail.mockResolvedValue(null);
      mockUsersService.saveUser.mockResolvedValue({
        id: 1,
        name: 'ex',
        email: 'novo@teste.com',
      });

      const resultado = await authService.register({
        nome: 'ex',
        email: 'novo@teste.com',
        senha: '123456',
      } as any);

      expect(resultado).toEqual({ id: 1, name: 'ex', email: 'novo@teste.com' });

      const senhaEnviada = mockUsersService.saveUser.mock.calls[0][1];
      expect(senhaEnviada).not.toBe('123456');
    });
  });

  describe('login', () => {
    it('deve lançar UnauthorizedException se o usuário não existir', async () => {
      mockUsersService.retornUserEmail.mockResolvedValue(null);

      await expect(
        authService.login({ email: 'inexistente@teste.com', senha: '123456' } as any),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('deve lançar UnauthorizedException se a senha estiver incorreta', async () => {
      const senhaHash = await bcrypt.hash('senha-correta', 4);
      mockUsersService.retornUserEmail.mockResolvedValue({ id: 1, senha: senhaHash });

      await expect(
        authService.login({ email: 'user@teste.com', senha: 'senha-errada' } as any),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('usuário inexistente e senha incorreta devem lançar exatamente o mesmo tipo de erro', async () => {
      mockUsersService.retornUserEmail.mockResolvedValueOnce(null);
      const erroUsuarioInexistente = await authService
        .login({ email: 'a@a.com', senha: '123' } as any)
        .catch((e) => e);

      const senhaHash = await bcrypt.hash('correta', 4);
      mockUsersService.retornUserEmail.mockResolvedValueOnce({ id: 1, senha: senhaHash });
      const erroSenhaErrada = await authService
        .login({ email: 'a@a.com', senha: 'errada' } as any)
        .catch((e) => e);

      expect(erroUsuarioInexistente).toBeInstanceOf(UnauthorizedException);
      expect(erroSenhaErrada).toBeInstanceOf(UnauthorizedException);
      expect(erroUsuarioInexistente.message).toBe(erroSenhaErrada.message);
    });

    it('deve retornar um token quando o e-mail e a senha estão corretos', async () => {
      const senhaHash = await bcrypt.hash('senha-correta', 4);
      mockUsersService.retornUserEmail.mockResolvedValue({ id: 1, senha: senhaHash });

      const resultado = await authService.login({
        email: 'user@teste.com',
        senha: 'senha-correta',
      } as any);

      expect(resultado).toEqual({ tokenJwt: 'token-fake' });
      expect(mockJwtService.signAsync).toHaveBeenCalledWith({ id: 1 });
    });
  });
});
