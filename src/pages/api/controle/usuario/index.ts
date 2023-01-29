import prisma from '@/infra/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

const RequestQuerySchema = z.object({
  limit: z
    .string()
    .nullish()
    .transform((value) => {
      return value ? +value : 10;
    }),
  page: z
    .string()
    .nullish()
    .transform((value) => {
      return value ? +value : 0;
    }),
});

export default async function Usuarios(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  try {
    const { limit, page } = RequestQuerySchema.parse(req.query);
    switch (method) {
      case 'GET':
        const users = await prisma.user.findMany({
          take: limit,
          skip: page,
          orderBy: {
            createdAt: 'desc',
          },
        });
        const count = await prisma.user.count();
        return res.status(200).json({
          data: users.map(({ firstName, lastName, email, id }) => {
            return { firstName, lastName, email, id };
          }),
          limit,
          page,
          count,
        });
    }
  } catch (error) {
    if (error instanceof Error) return res.status(500).send(error.message);
    else return res.status(500).end();
  }
}
