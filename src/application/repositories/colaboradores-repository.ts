import { Collaborator } from '@prisma/client';
import { Colaborador } from '../entities/colaborador';

export abstract class ColaboradoresRepository {
  abstract find(): Promise<{ data: Colaborador[]; count: number }>;
  abstract findById(id: string): Promise<
    | (Collaborator & {
        occupations: {
          occupation: {
            name: string;
          };
        }[];
      })
    | null
  >;
  abstract create(colaborador: Colaborador): Promise<void>;
  abstract save(colaborador: Colaborador, id: string): Promise<void>;
}
