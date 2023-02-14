import { z } from 'zod';
import { EntityBase } from './entity-base';

const usuarioSchema = z.object({
  primeiroNome: z.string(),
  ultimoNome: z.string(),
  nome: z.string(),
  email: z.string().email(),
  senha: z.string(),
  avatar: z.string().nullable(),
  criadoEm: z
    .string()
    .nullish()
    .transform((value) => {
      if (value) {
        return new Date(value);
      }
    }),
  excluidoEm: z
    .string()
    .nullish()
    .transform((value) => {
      if (value) {
        return new Date(value);
      }
    }),
});
type UsuarioData = z.infer<typeof usuarioSchema>;
export class Usuario extends EntityBase<UsuarioData> {
  get primeiroNome() {
    return this.data.primeiroNome;
  }
  set primeiroNome(value: string) {
    this.data.primeiroNome = value;
  }
  get ultimoNome() {
    return this.data.ultimoNome;
  }
  set ultimoNome(value: string) {
    this.data.ultimoNome = value;
  }
  get nome() {
    return this.data.nome;
  }
  get senha() {
    return this.data.senha;
  }
  set senha(value: string) {
    this.data.senha = value;
  }
  get email() {
    return this.data.email;
  }
  get avatar() {
    return this.data.avatar;
  }
  set avatar(value: string | null) {
    this.data.avatar = value;
  }
  get criadoEm() {
    return this.data.criadoEm;
  }
  get excluidoEm() {
    return this.data.excluidoEm;
  }
}
