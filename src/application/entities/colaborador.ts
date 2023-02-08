import { randomUUID } from 'crypto';
import { z } from 'zod';

const colaboradorSchema = z.object({
  nome: z.string(),
  razao_social: z.string().nullable(),
  apelido: z.string().nullable(),
  email: z.string().nullable(),
  telefone: z.string().nullable(),
  celular: z.string().nullable(),
  telefone_comercial: z.string().nullable(),
  avatar: z.string().nullable(),
  cep: z.string().nullable(),
  logradouro: z.string().nullable(),
  cidade: z.string().nullable(),
  numero: z.string().nullable(),
  endereco_complemento: z.string().nullable(),
  uf: z.string().nullable(),
  bairro: z.string().nullable(),
});

type ColaboradorData = z.infer<typeof colaboradorSchema>;

export class Colaborador {
  private _id: string;
  private data: ColaboradorData;
  constructor(props: ColaboradorData, id?: string) {
    this._id = id ?? randomUUID();
    this.data = props;
  }

  get id() {
    return this._id;
  }
  get nome() {
    return this.data.nome;
  }
  get razaoSocial() {
    return this.data.razao_social;
  }
  get apelido() {
    return this.data.apelido;
  }
  get email() {
    return this.data.email;
  }
  get telefone() {
    return this.data.telefone;
  }
  get celular() {
    return this.data.celular;
  }
  get telefoneComercial() {
    return this.data.telefone_comercial;
  }
  get cep() {
    return this.data.cep;
  }
  get logradouro() {
    return this.data.logradouro;
  }
  get numero() {
    return this.data.numero;
  }
  get bairro() {
    return this.data.bairro;
  }
  get cidade() {
    return this.data.cidade;
  }
  get estado() {
    return this.data.uf;
  }
  get complemento() {
    return this.data.endereco_complemento;
  }
  get avatar() {
    return this.data.avatar;
  }
}
