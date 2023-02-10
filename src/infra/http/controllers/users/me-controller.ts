import { MeUsecase } from '@/application/use-cases/users/me-use-case';
import { decodeToken } from '@/helpers/decode-token';
import { NextApiRequest, NextApiResponse } from 'next';
import { container } from 'tsyringe';
import { UsuarioViewModel } from '../../usuario-view-model';

export class MeController {
  static async handle(req: NextApiRequest, res: NextApiResponse) {
    try {
      const userId = decodeToken(req);
      if (userId) {
        const usecase = container.resolve(MeUsecase);
        const user = await usecase.execute(userId);
        if (user) return res.status(200).json(UsuarioViewModel.toHTTP(user));
        else
          return res.status(401).json({
            code: 'usuario',
            message: 'Usuário não encontrado!',
          });
      } else {
        return res.status(401).json({
          code: 'token.error',
          message: 'Erro no token',
        });
      }
    } catch (error) {}
  }
}
