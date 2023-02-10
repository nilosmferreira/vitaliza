import { FindMany } from '@/application/dtos/find-many';
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
  async find({
    take,
    skip,
  }: FindMany): Promise<{ results: Usuario[]; count: number }> {
    const results = await prisma.user.findMany({
      take,
      skip,
    });
    if (results) {
      const usuarios = results.map((user) =>
        PrismaUsuariosMapper.toDomain(user)
      );
      const count = await prisma.user.count();
      return {
        results: usuarios,
        count,
      };
    } else {
      const usuarios: Usuario[] = [];
      return { results: usuarios, count: 0 };
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
