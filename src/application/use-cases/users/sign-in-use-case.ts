import { UsuariosRepository } from '@/application/repositories/usuarios-repository';
import { compareSync } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

interface SignInUsecaseProps {
  username: string;
  password: string;
}
@injectable()
export class SignInUsecase {
  constructor(
    @inject('usersRepository')
    private readonly repository: UsuariosRepository
  ) {}
  async execute({ username, password }: SignInUsecaseProps) {
    const user = await this.repository.findByUsername(username);

    if (!user || !compareSync(password, user.senha)) {
      throw new Error('Usuário ou senha incorreto!');
    }

    const { primeiroNome, ultimoNome, nome, email, avatar } = user;
    const payload = {
      firstName: primeiroNome,
      lastName: ultimoNome,
      userName: nome,
      email,
      avatar,
    };
    const token = sign(payload, String(process.env.SECRET_JWT), {
      expiresIn: '1h',
      subject: user.id,
    });
    return { token, payload };
  }
}
