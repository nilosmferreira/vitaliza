import { FindMany } from '../dtos/find-many';
import { Usuario } from '../entities/usuario';

export abstract class UsuariosRepository {
  abstract create(usuario: Usuario): Promise<void>;
  abstract find({
    take,
    skip,
  }: FindMany): Promise<{ results: Usuario[]; count: number }>;
  abstract findById(id: string): Promise<Usuario | null>;
  abstract findByUsername(username: string): Promise<Usuario | null>;
  abstract findByEmail(email: string): Promise<Usuario | null>;
  abstract update(usuario: Usuario): Promise<void>;
}
