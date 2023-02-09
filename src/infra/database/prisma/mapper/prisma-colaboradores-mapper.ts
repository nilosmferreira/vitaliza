import { Colaborador } from '@/application/entities/colaborador';
import { Collaborator } from '@prisma/client';

export class PrismaColaboradoresMapper {
  static toPrisma({
    apelido,
    avatar,
    bairro,
    celular,
    cep,
    cidade,
    complemento,
    email,
    estado,
    id,
    logradouro,
    nome,
    numero,
    razaoSocial,
    telefone,
    telefoneComercial,
  }: Colaborador): Collaborator {
    return {
      cellPhone: celular,
      corporateName: razaoSocial,
      corporatePhone: telefoneComercial,
      email: email,
      id: id,
      name: nome,
      phone: telefone,
      surname: apelido,
      avatar: avatar,
      zip: cep,
      addressComplement: complemento,
      city: cidade,
      state: estado,
      district: bairro,
      number: numero,
      street: logradouro,
    };
  }
  static toDomain({
    id,
    addressComplement,
    avatar,
    cellPhone,
    city,
    corporateName,
    corporatePhone,
    state,
    district,
    email,
    name,
    number,
    phone,
    street,
    surname,
    zip,
    occupations,
  }: Collaborator & {
    occupations: { occupation: { name: string } }[];
  }): Colaborador {
    return new Colaborador(
      {
        apelido: surname,
        celular: cellPhone,
        email: email,
        nome: name,
        telefone: phone,
        telefone_comercial: corporatePhone,
        avatar: avatar,
        bairro: district,
        cep: zip,
        cidade: city,
        endereco_complemento: addressComplement,
        logradouro: street,
        numero: number,
        razao_social: corporateName,
        uf: state,
        cargos: occupations.map((item) => item.occupation.name),
      },
      id
    );
  }
}
