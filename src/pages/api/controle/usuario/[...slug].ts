import prisma from '@/infra/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  if (method === 'PATCH') {
    const [userId, type, _] = req.query.slug as string[];

    if (type === 'toggle') {
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (user) {
        const deletedAt = user.deletedAt ? null : new Date();
        await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            deletedAt,
          },
        });
      }
      return res.status(200).end();
    }
  }
  return res.status(200).end();
}
