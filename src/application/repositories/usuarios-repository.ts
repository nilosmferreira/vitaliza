import { Usuario } from '../entities/usuario';

export abstract class UsuariosRepository {
  abstract create(usuario: Usuario): Promise<void>;
  abstract find(): Promise<Usuario[]>;
  abstract findById(id: string): Promise<Usuario | null>;
  abstract findByEmail(email: string): Promise<Usuario | null>;
  abstract update(usuario: Usuario): Promise<void>;
}
