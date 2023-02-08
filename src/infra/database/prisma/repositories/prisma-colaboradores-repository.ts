import { Colaborador } from '@/application/entities/colaborador';
import { ColaboradoresRepository } from '@/application/repositories/colaboradores-repository';
import prisma from '../../prisma';
import { PrismaColaboradoresMapper } from '../mapper/prisma-colaboradores-mapper';

export class PrismaColaboradoresRepository implements ColaboradoresRepository {
  async find(): Promise<Colaborador[]> {
    const colaboradores = await prisma.collaborator.findMany({});
    return colaboradores.map((colaborador) =>
      PrismaColaboradoresMapper.toDomain(colaborador)
    );
  }
  async create(colaborador: Colaborador): Promise<void> {
    const data = PrismaColaboradoresMapper.toPrisma(colaborador);
    await prisma.collaborator.create({
      data: {
        ...data,
      },
    });
  }
}
