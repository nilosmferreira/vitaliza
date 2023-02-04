import { RequestQuerySchema } from '@/helpers/request-query-schema';
import prisma from '@/infra/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  if (method === 'GET') {
    const { limit, offset } = RequestQuerySchema.parse(req.query);

    const result = await prisma.person.findMany({
      where: {
        typePerson: {
          name: 'colaborador',
        },
      },
    });

    const count = await prisma.person.count({
      where: {
        typePerson: {
          name: 'colaborador',
        },
      },
    });
    return res.status(200).json({ colaboradores: result, count });
  } else if (method === 'POST') {
  }
}
