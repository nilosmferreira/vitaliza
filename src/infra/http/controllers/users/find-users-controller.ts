import { FindUsersUseCase } from '@/application/use-cases/users/find-users-use-case';
import { RequestQuerySchema } from '@/helpers/request-query-schema';
import { NextApiRequest, NextApiResponse } from 'next';
import { container } from 'tsyringe';
import { UsuarioViewModel } from '../../usuario-view-model';

export class FindUsersController {
  static async handle(req: NextApiRequest, res: NextApiResponse) {
    const { limit, offset } = RequestQuerySchema.parse(req.query);
    const usecase = container.resolve(FindUsersUseCase);
    const users = await usecase.execute({
      take: limit,
      skip: offset,
    });
    const results = users.results.map((user) => UsuarioViewModel.toHTTP(user));
    return res.status(200).json({
      results,
      count: users.count,
    });
  }
}
