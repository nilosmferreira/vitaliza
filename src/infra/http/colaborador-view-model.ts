import { Colaborador } from '@/application/entities/colaborador';

export class ColaboradorViewModel {
  static toHTTP({
    apelido,
    avatar,
    bairro,
    cargos,
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
  }: Colaborador) {
    return {
      id,
      bairro,
      cargos,
      cep,
      cidade,
      complemento,
      uf: estado,
      logradouro,
      nome,
      numero,
      razao: razaoSocial,
      telefoneComercial,
      apelido,
      celular,
      telefone,
      avatar,
    };
  }
}
