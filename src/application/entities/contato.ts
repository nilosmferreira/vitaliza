import { randomUUID } from 'crypto';
import { z } from 'zod';

export const ContatoSchema = z.object({
  nome: z.string(),
  telefone: z.string().nullish(),
  celular: z.string().nullish(),
});
type ContatoProps = z.infer<typeof ContatoSchema>;
export class Contato {
  private _id: string;
  private data: ContatoProps;
  constructor(props: ContatoProps, id?: string) {
    this._id = id ?? randomUUID();
    this.data = props;
  }
  get id() {
    return this._id;
  }
  get nome() {
    return this.data.nome;
  }
  get celular() {
    return this.data.celular;
  }
  get telefone() {
    return this.data.telefone;
  }
}
