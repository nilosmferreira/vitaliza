import { Endereco } from '@/application/entities/endereco';
import { Pessoa } from '@/application/entities/pessoa';
import { Address, Person } from '@prisma/client';
export class PrismaColaboradoresMapper {
  static toPrisma(colaborador: Pessoa): Person {
    return {
      cellphone: colaborador.celular,
      corporateName: colaborador.razaoSocial,
      corporatePhone: colaborador.telefoneComercial,
      email: colaborador.email,
      id: colaborador.id,
      name: colaborador.nome,
      phone: colaborador.telefone,
      surname: colaborador.apelido,
      typePersonId: colaborador.tipoPessoa,
    };
  }
  static toDomain(
    colaborador: Person & {
      AddressesPerson: {
        address: Address;
      }[];
    }
  ): Pessoa {
    const { AddressesPerson } = colaborador;

    return new Pessoa(
      {
        apelido: colaborador.surname,
        celular: colaborador.cellphone,
        email: colaborador.email,
        nome: colaborador.name,
        razao: colaborador.corporateName,
        telefone: colaborador.phone,
        telefone_comercial: colaborador.corporatePhone,
        tipoPessoa: 'colaborador',
        endereco: AddressesPerson.map((item) => {
          const address = item.address;
          return new Endereco(
            {
              bairro: address.distrinct,
              cep: address.zip,
              cidade: address.city,
              estado: 'PE',
              logradouro: address.street,
              complemento: address.complement,
              numero: address.number,
            },
            address.id
          );
        }),
      },
      colaborador.id
    );
  }
}
