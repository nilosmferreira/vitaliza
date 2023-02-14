import { UsuariosRepository } from '@/application/repositories/usuarios-repository';
import { deletingS3Amazon } from '@/application/shared/deleting-image-s3-amazon';
import { parseForm } from '@/application/shared/formidable-parse';
import { sendingS3Amazon } from '@/application/shared/sending-s3-amazon';
import { PrismaUsuariosMapper } from '@/infra/database/prisma/mapper/prisma-usuarios-mapper';
import formidable from 'formidable';
import { injectable, inject } from 'tsyringe';
import { z } from 'zod';

const updateUserData = z.object({
  firstName: z.string({
    required_error: 'Campo é obrigatório',
  }),
  lastName: z.string({
    required_error: 'Campo é obrigatório',
  }),
  email: z
    .string({
      required_error: 'Campo é obrigatório',
    })
    .email({
      message: 'Não é um e-mail válido',
    }),
});

@injectable()
export class UpdateUserUseCase {
  constructor(
    @inject('usersRepository')
    private readonly repository: UsuariosRepository
  ) {}
  async execute(data: string, file?: formidable.File[]) {
    try {
      const { firstName, lastName, email } = updateUserData.parse(
        JSON.parse(data)
      );
      const user = await this.repository.findByEmail(email);

      if (user) {
        if (file) {
          const result = await sendingS3Amazon(file[0]);
          if (user.avatar) await deletingS3Amazon(user.avatar);
          user.avatar = result.fileName;
        }
        user.primeiroNome = firstName;
        user.ultimoNome = lastName;
        await this.repository.update(user);
      } else {
        throw new Error('Problema em obter os dados');
      }
    } catch (error) {
      throw error;
    }
  }
}
