import { MeController } from '@/infra/http/controllers/users/me-controller';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function me(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }
  await MeController.handle(req, res);
}
