import prisma from '@/infra/prisma';
import { Prisma, User } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handle(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  if (method === 'GET') {
    const [field, value] = req.query.params as string[];
    if (!value) return res.status(400).end();

    if (field === 'username') {
      prisma.user
        .findFirst({
          where: {
            userName: value,
          },
        })
        .then((result) => {
          return res.status(200).json(result);
        });
    } else if (field === 'email') {
      prisma.user
        .findFirst({
          where: {
            email: value,
          },
        })
        .then((result) => {
          return res.status(200).json(result);
        });
    }
  }
}
