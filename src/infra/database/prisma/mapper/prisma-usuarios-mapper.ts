import { Usuario } from '@/application/entities/usuario';
import { User } from '@prisma/client';

export class PrismaUsuariosMapper {
  static toPrisma(usuario: Usuario): User {
    return {
      avatar: usuario.avatar,
      email: usuario.email,
      firstName: usuario.primeiroNome,
      lastName: usuario.ultimoNome,
      id: usuario.id,
      password: usuario.senha,
      userName: usuario.nome,
      createdAt: usuario.criadoEm ?? new Date(),
      deletedAt: usuario.excluidoEm ?? null,
    };
  }
  static toDomain(user: User): Usuario {
    return new Usuario(
      {
        avatar: user.avatar,
        email: user.email,
        nome: user.userName,
        primeiroNome: user.firstName,
        senha: user.password,
        ultimoNome: user.lastName,
        criadoEm: user.createdAt,
        excluidoEm: user.deletedAt ?? undefined,
      },
      user.id
    );
  }
}
