import prisma from '@/infra/prisma';
import { decodeToken } from '@/helpers/decode-token';
import { NextApiRequest, NextApiResponse } from 'next';
import { verify } from 'jsonwebtoken';
import { compareSync, hashSync } from 'bcrypt';
import { z } from 'zod';

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

  try {
    const userId = decodeToken(req);
    console.log('decodificou');
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      return res.status(400);
    }
    const { currentPassword, newPassword, confirmPassword } =
      RequestDataSchema.parse(req.body);
    if (!compareSync(currentPassword, user.password)) {
      return res.status(400).json({
        message: 'Senha incorreta!',
      });
    }
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        message: 'Senha incorreta!',
      });
    }
    const hashPassword = hashSync(newPassword, 13);

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: hashPassword,
      },
    });

    return res.status(201).end();
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}
