import { Usuario } from '@/application/entities/usuario';
import { UsuariosRepository } from '@/application/repositories/usuarios-repository';
import { inject, injectable } from 'tsyringe';
interface FindingUserProps {
  field: 'username' | 'email' | 'id' | string;
  value: string;
}
@injectable()
export class FindingUser {
  constructor(
    @inject('usersRepository')
    private readonly repository: UsuariosRepository
  ) {}
  async execute({ field, value }: FindingUserProps) {
    let user: Usuario | null;
    switch (field) {
      case 'email':
        user = await this.repository.findByEmail(value);
        break;
      case 'id':
        user = await this.repository.findById(value);
        break;
      case 'username':
        user = await this.repository.findByUsername(value);
        break;
      default:
        user = null;
        break;
    }
    return user;
  }
}
