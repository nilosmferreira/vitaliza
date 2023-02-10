import { UsuariosRepository } from '@/application/repositories/usuarios-repository';
import { compareSync, hashSync } from 'bcrypt';
import { inject, injectable } from 'tsyringe';

interface ChangePasswordUseCaseProps {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  id: string;
}

@injectable()
export class ChangePasswordUseCase {
  constructor(
    @inject('usersRepository')
    private readonly repository: UsuariosRepository
  ) {}
  async execute({
    currentPassword,
    newPassword,
    confirmPassword,
    id,
  }: ChangePasswordUseCaseProps) {
    if (newPassword !== confirmPassword) throw new Error('Senha incorreta');

    const user = await this.repository.findById(id);

    if (!user) throw new Error('Usuário não encontrado');

    if (!compareSync(currentPassword, user.senha))
      throw new Error('Senha incorreta');

    const hashPassword = hashSync(newPassword, 13);
    user.senha = hashPassword;
    await this.repository.update(user);
  }
}
