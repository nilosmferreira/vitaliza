import { FindingUser } from '@/application/use-cases/users/find-use-case';
import { NextApiRequest, NextApiResponse } from 'next';
import { container } from 'tsyringe';
import { UsuarioViewModel } from '../../usuario-view-model';

export class FindUserController {
  static async handle(req: NextApiRequest, res: NextApiResponse) {
    const [field, value] = req.query.params as string[];
    if (!value) return res.status(400).end();

    const usecase = container.resolve(FindingUser);

    const user = await usecase.execute({ field, value });

    if (user) {
      return res.status(200).json(UsuarioViewModel.toHTTP(user));
    } else {
      return res.status(400).json({ message: 'Não encontrado' });
    }
  }
}
