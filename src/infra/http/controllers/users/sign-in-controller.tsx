import { SignInUsecase } from '@/application/use-cases/users/sign-in-use-case';
import { NextApiRequest, NextApiResponse } from 'next';
import { container } from 'tsyringe';
import { z } from 'zod';

const RequestBody = z.object({
  username: z.string(),
  password: z.string(),
});
export class SignInController {
  static async handle(req: NextApiRequest, res: NextApiResponse) {
    const { username, password } = RequestBody.parse(req.body);

    const usecase = container.resolve(SignInUsecase);
    try {
      const result = await usecase.execute({
        password,
        username,
      });
      return res.status(200).json({
        token: result.token,
        payload: result.payload,
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  }
}
