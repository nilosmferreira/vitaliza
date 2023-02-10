import { inject, injectable } from 'tsyringe';
import { FindMany } from '../../dtos/find-many';
import { UsuariosRepository } from '@/application/repositories/usuarios-repository';

@injectable()
export class FindUsersUseCase {
  constructor(
    @inject('usersRepository') private repository: UsuariosRepository
  ) {}

  async execute({ take, skip }: FindMany) {
    const users = await this.repository.find({ take, skip });

    return users;
  }
}
