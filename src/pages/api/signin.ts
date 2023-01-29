import prisma from '@/infra/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { compareSync } from 'bcrypt';
import { sign } from 'jsonwebtoken';

const RequestBody = z.object({
  usuario: z.string(),
  senha: z.string(),
});
export default async function signin(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  if (method !== 'POST') {
    return res.status(404).end();
  }

  const { usuario, senha } = RequestBody.parse(req.body);

  const user = await prisma.usuario.findUnique({
    where: {
      nomeUsuario: usuario,
    },
  });

  if (!user || !compareSync(senha, user.senha)) {
    return res.status(400).json({ message: 'Usuário ou senha incorreto!' });
  }

  const token = sign(
    {
      nomeUsuario: user.nomeUsuario,
      primeiroNome: user.primeiroNome,
      ultimoNome: user.ultimoNome,
      email: user.email,
    },
    String(process.env.SECRET_JWT),
    {
      expiresIn: '1h',
      subject: user.id,
    }
  );

  return res.status(200).json({ token });
}
