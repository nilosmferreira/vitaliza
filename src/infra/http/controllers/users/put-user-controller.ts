import { parseForm } from '@/application/shared/formidable-parse';
import { UpdateUserUseCase } from '@/application/use-cases/users/update-user-use-case';
import formidable from 'formidable';
import { NextApiRequest, NextApiResponse } from 'next';
import { container } from 'tsyringe';
// import { config } from '@/helpers/request-query-schema';

export class PutUserController {
  static async handle(req: NextApiRequest, res: NextApiResponse) {
    try {
      const [fields, files] = await parseForm(req);
      const usecase = container.resolve(UpdateUserUseCase);
      await usecase.execute(
        String(fields['data']),
        files['avatar'] as formidable.File[]
      );
      return res.status(200).end();
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}
