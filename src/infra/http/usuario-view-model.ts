import { Usuario } from '@/application/entities/usuario';

export class UsuarioViewModel {
  static toHTTP(user: Usuario) {
    return {
      firstName: user.primeiroNome,
      lastName: user.ultimoNome,
      userName: user.nome,
      email: user.email,
      avatar: user.avatar,
      id: user.id,
    };
  }
}
