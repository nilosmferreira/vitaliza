import { decodeToken } from '@/helpers/decode-token';
import prisma from '@/infra/database/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function me(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  try {
    const userId = decodeToken(req);

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (user) {
      const { firstName, lastName, userName, email, avatar } = user;
      return res.status(200).json({
        firstName,
        lastName,
        userName,
        email,
        avatar,
      });
    } else {
      return res.status(400).json({ message: 'Usuário não encontrado!' });
    }
  } catch (error) {
    return res.status(500).end();
  }
}
