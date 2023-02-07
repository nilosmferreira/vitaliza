import { Pessoa } from '../entities/pessoa';

export abstract class ColaboradoresRepository {
  abstract find(): Promise<Pessoa[]>;
  abstract create(colaborador: Pessoa): Promise<void>;
}
