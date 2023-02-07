import { randomUUID } from 'node:crypto';
import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import prisma from '@/infra/database/prisma';
const cargoPostSchema = z.object({
  nome: z.string(),
});
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  if (method === 'GET') {
    const result = await prisma.occupation.findMany();
    return res.status(200).json(result);
  } else if (method === 'POST') {
    const { nome } = cargoPostSchema.parse(req.body);

    await prisma.occupation.create({
      data: {
        id: randomUUID(),
        name: nome,
      },
    });
    return res.status(201).end();
  }
}
