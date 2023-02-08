import { randomUUID } from 'node:crypto';
import { z } from 'zod';
import { Endereco, enderecoSchema } from './endereco';

export const PessoaSchema = z.object({
  tipoPessoa: z.enum(['colaborador', 'atleta', 'responsavel']),
  nome: z.string(),
  razao: z.string().nullable(),
  apelido: z.string().nullable(),
  email: z.string().email().nullable(),
  telefone: z.string().nullable(),
  celular: z.string().nullable(),
  telefone_comercial: z.string().nullable(),
  endereco: z.array(enderecoSchema),
  avatar: z.string().nullable(),
});
type PessoaProps = z.infer<typeof PessoaSchema>;
export class Pessoa {
  private _id: string;
  private data: PessoaProps;
  constructor(props: PessoaProps, id?: string) {
    this._id = id ?? randomUUID();
    this.data = props;
  }

  get id() {
    return this._id;
  }
  get nome() {
    return this.data.nome;
  }
  get tipoPessoa() {
    return this.data.tipoPessoa;
  }
  get razaoSocial() {
    return this.data.razao;
  }
  get apelido() {
    return this.data.apelido;
  }
  get email() {
    return this.data.email;
  }
  get celular() {
    return this.data.celular;
  }
  get telefone() {
    return this.data.telefone;
  }
  get telefoneComercial() {
    return this.data.telefone_comercial;
  }
  get endereco() {
    return this.data.endereco;
  }
  get avatar() {
    return this.data.avatar;
  }
}
