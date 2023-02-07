import { Pessoa } from '@/application/entities/pessoa';
import { ColaboradoresRepository } from '@/application/repositories/colaboradores-repository';
import prisma from '../../prisma';
import { PrismaColaboradoresMapper } from '../mapper/prisma-colaboradores-mapper';

export class PrismaColaboradoresRepository implements ColaboradoresRepository {
  async find(): Promise<Pessoa[]> {
    const colaboradores = await prisma.person.findMany({
      where: {
        typePerson: {
          name: 'colaborador',
        },
      },
      include: {
        AddressesPerson: {
          select: {
            address: true,
          },
        },
      },
    });
    return colaboradores.map((colaborador) =>
      PrismaColaboradoresMapper.toDomain(colaborador)
    );
  }
  create(colaborador: Pessoa): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
