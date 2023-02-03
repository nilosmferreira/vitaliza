import { randomUUID } from 'node:crypto';
import { z } from 'zod';
import { EnderecoSchema } from './endereco';

export const PessoaSchema = z.object({
  tipoPessoa: z.enum(['colaborador', 'atleta', 'responsavel']),
  nome: z.string(),
  razaoSocial: z.string().nullish(),
  apelido: z.string().nullish(),
  email: z.string().email().nullish(),
  telefone: z.string(),
  celular: z.string(),
  telefoneComercial: z.string(),
  endereco: z.array(EnderecoSchema),
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
    return this.data.razaoSocial;
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
    return this.data.telefoneComercial;
  }
  get endereco() {
    return this.data.endereco;
  }
}
