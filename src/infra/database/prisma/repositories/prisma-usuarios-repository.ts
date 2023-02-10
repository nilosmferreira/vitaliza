import { Usuario } from '@/application/entities/usuario';
import { UsuariosRepository } from '@/application/repositories/usuarios-repository';
import prisma from '../../prisma';
import { PrismaUsuariosMapper } from '../mapper/prisma-usuarios-mapper';

export class PrismaUsuariosRepository implements UsuariosRepository {
  async create(usuario: Usuario): Promise<void> {
    await prisma.user.create({
      data: PrismaUsuariosMapper.toPrisma(usuario),
    });
  }
  async find(): Promise<Usuario[]> {
    const results = await prisma.user.findMany({});
    if (results) {
      return results.map((user) => PrismaUsuariosMapper.toDomain(user));
    } else {
      const usuarios: Usuario[] = [];
      return usuarios;
    }
  }
  async findById(id: string): Promise<Usuario | null> {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (user) {
      return PrismaUsuariosMapper.toDomain(user);
    } else {
      return null;
    }
  }
  async findByUsername(username: string): Promise<Usuario | null> {
    const user = await prisma.user.findUnique({
      where: {
        userName: username,
      },
    });
    if (user) {
      return PrismaUsuariosMapper.toDomain(user);
    } else {
      return null;
    }
  }
  async findByEmail(email: string): Promise<Usuario | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (user) {
      return PrismaUsuariosMapper.toDomain(user);
    } else {
      return null;
    }
  }
  async update(usuario: Usuario): Promise<void> {
    await prisma.user.update({
      where: {
        id: usuario.id,
      },
      data: PrismaUsuariosMapper.toPrisma(usuario),
    });
  }
}
