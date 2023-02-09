import { Colaborador } from '@/application/entities/colaborador';
import { ColaboradoresRepository } from '@/application/repositories/colaboradores-repository';
import { Collaborator } from '@prisma/client';
import prisma from '../../prisma';
import { PrismaColaboradoresMapper } from '../mapper/prisma-colaboradores-mapper';

export class PrismaColaboradoresRepository implements ColaboradoresRepository {
  async findById(
    id: string
  ): Promise<
    (Collaborator & { occupations: { occupation: { name: string } }[] }) | null
  > {
    const result = await prisma.collaborator.findFirst({
      where: { id },
      include: {
        occupations: {
          select: {
            occupation: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
    return result;
  }
  async find(): Promise<{ data: Colaborador[]; count: number }> {
    const colaboradores = await prisma.collaborator.findMany({
      include: {
        occupations: {
          select: {
            occupation: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
    const count = await prisma.collaborator.count();
    const result = colaboradores.map((colaborador) =>
      PrismaColaboradoresMapper.toDomain(colaborador)
    );
    return {
      data: result,
      count,
    };
  }
  async create(colaborador: Colaborador): Promise<void> {
    const data = PrismaColaboradoresMapper.toPrisma(colaborador);
    await prisma.collaborator.create({
      data: {
        ...data,
      },
    });
  }
  async save(colaborador: Colaborador, id: string): Promise<void> {
    const data = PrismaColaboradoresMapper.toPrisma(colaborador);
    await prisma.collaborator.update({
      where: {
        id,
      },
      data,
    });
  }
}
