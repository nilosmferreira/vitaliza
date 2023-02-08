import { randomUUID } from 'crypto';
import { z } from 'zod';

export const enderecoSchema = z.object({
  id: z.string().nullable(),
  cep: z.string(),
  logradouro: z.string(),
  numero: z.string().nullish(),
  complemento: z.string().nullish(),
  cidade: z.string(),
  bairro: z.string().nullable(),
  estado: z.string(),
});
type EnderecoProps = z.infer<typeof enderecoSchema>;
export class Endereco {
  private _id: string;
  private data: EnderecoProps;
  constructor(props: EnderecoProps, id?: string) {
    this._id = id ?? randomUUID();

    this.data = props;
  }
  get id(): string {
    return this._id;
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
  get cidade() {
    return this.data.cidade;
  }
  get bairro() {
    return this.data.bairro;
  }
  get estado() {
    return this.data.estado;
  }
  get complemento() {
    return this.data.complemento;
  }
}
