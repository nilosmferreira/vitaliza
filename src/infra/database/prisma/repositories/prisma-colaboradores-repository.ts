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
  async create(colaborador: Pessoa): Promise<void> {
    const data = PrismaColaboradoresMapper.toPrisma(colaborador);
    await prisma.person.create({
      data: {
        ...data,
        AddressesPerson: {
          create: {
            address: {
              create: colaborador.endereco.map(
                ({
                  bairro,
                  cep,
                  cidade,
                  estado,
                  logradouro,
                  complemento,
                  numero,
                  id,
                }) => ({
                  city: cidade,
                  id,
                  street: logradouro,
                  zip: cep,
                  complement: complemento,
                  number: numero,
                })
              ),
            },
          },
        },
      },
    });
  }
}
