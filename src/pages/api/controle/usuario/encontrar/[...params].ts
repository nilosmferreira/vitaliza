import { FindUserController } from '@/infra/http/controllers/users/find-user-controller';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  if (method === 'GET') {
    await FindUserController.handle(req, res);
  }
}
