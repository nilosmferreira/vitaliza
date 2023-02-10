import { ChangePasswordUseCase } from '@/application/use-cases/users/change-password-use-case';
import { decodeToken } from '@/helpers/decode-token';
import { NextApiRequest, NextApiResponse } from 'next';
import { container } from 'tsyringe';
import { z } from 'zod';
const RequestDataSchema = z.object({
  currentPassword: z.string(),
  newPassword: z.string(),
  confirmPassword: z.string(),
});
export class ChangePasswordController {
  static async handle(req: NextApiRequest, res: NextApiResponse) {
    try {
      const userId = decodeToken(req);
      if (!userId) {
        return res.status(500).json({
          code: 'token',
          message: 'token',
        });
      }
      const usecase = container.resolve(ChangePasswordUseCase);
      const { currentPassword, newPassword, confirmPassword } =
        RequestDataSchema.parse(req.body);

      await usecase.execute({
        currentPassword,
        newPassword,
        confirmPassword,
        id: userId,
      });
    } catch (error) {
      if (error instanceof Error)
        return res.status(500).json({ message: error.message });
    }
  }
}
