import { NextApiRequest, NextApiResponse } from 'next';
import { SignInController } from '@/infra/http/controllers/users/sign-in-controller';

export default async function signin(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  if (method !== 'POST') {
    return res.status(404).end();
  }

  await SignInController.handle(req, res);
}
