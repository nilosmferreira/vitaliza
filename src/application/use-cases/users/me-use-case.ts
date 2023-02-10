import { UsuariosRepository } from '@/application/repositories/usuarios-repository';
import { inject, injectable } from 'tsyringe';

@injectable()
export class MeUsecase {
  constructor(
    @inject('usersRepository')
    private readonly repository: UsuariosRepository
  ) {}
  async execute(id: string) {
    const user = await this.repository.findById(id);

    return user;
  }
}
