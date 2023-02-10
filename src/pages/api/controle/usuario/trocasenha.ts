import { decodeToken } from '@/helpers/decode-token';
import { NextApiRequest, NextApiResponse } from 'next';
import { verify } from 'jsonwebtoken';
import { compareSync, hashSync } from 'bcrypt';
import { z } from 'zod';
import prisma from '@/infra/database/prisma';
import { ChangePasswordController } from '@/infra/http/controllers/users/change-password-controller';

const RequestDataSchema = z.object({
  currentPassword: z.string(),
  newPassword: z.string(),
  confirmPassword: z.string(),
});
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') return res.status(403).end();

  await ChangePasswordController.handle(req, res);
}
