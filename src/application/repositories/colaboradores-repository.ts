import { Colaborador } from '../entities/colaborador';

export abstract class ColaboradoresRepository {
  abstract find(): Promise<Colaborador[]>;
  abstract create(colaborador: Colaborador): Promise<void>;
}
