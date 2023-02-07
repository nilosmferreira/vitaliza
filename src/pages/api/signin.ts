import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { compareSync } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import prisma from '@/infra/database/prisma';

const RequestBody = z.object({
  username: z.string(),
  password: z.string(),
});
export default async function signin(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  if (method !== 'POST') {
    return res.status(404).end();
  }

  const { username, password } = RequestBody.parse(req.body);

  const user = await prisma.user.findUnique({
    where: {
      userName: username,
    },
  });

  if (!user || !compareSync(password, user.password)) {
    return res.status(400).json({ message: 'Usuário ou senha incorreto!' });
  }
  const { firstName, lastName, email, userName, avatar } = user;
  const token = sign(
    {
      firstName,
      lastName,
      userName,
      email,
      avatar,
    },
    String(process.env.SECRET_JWT),
    {
      expiresIn: '1h',
      subject: user.id,
    }
  );

  return res.status(200).json({ token });
}
