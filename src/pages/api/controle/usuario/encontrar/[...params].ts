import prisma from '@/infra/database/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  if (method === 'GET') {
    const [field, value] = req.query.params as string[];
    if (!value) return res.status(400).end();

    if (field === 'username') {
      try {
        const result = await prisma.user.findFirst({
          where: {
            userName: value,
          },
        });
        return res.status(200).json(result);
      } catch (error) {
        return res.status(400).json(error);
      }
    } else if (field === 'email') {
      try {
        const result = await prisma.user.findFirst({
          where: {
            email: value,
          },
        });
        return res.status(200).json(result);
      } catch (error) {
        return res.status(400).json(error);
      }
    } else if (field === 'id') {
      try {
        const result = await prisma.user.findFirst({
          where: {
            id: value,
          },
        });
        return res.status(200).json(result);
      } catch (error) {
        return res.status(400).json(error);
      }
    }
  }
}
