import { NextApiRequest } from 'next';
import { decode, verify } from 'jsonwebtoken';

interface PayloadData {
  sub: string;
}
export function decodeToken(req: NextApiRequest) {
  const authorization = req.headers['authorization'];
  if (authorization) {
    const [_, token] = authorization.split(' ');
    if (!verify(token, String(process.env.SECRET_JWT))) {
      throw new Error('token invalid');
    }
    const { sub } = decode(token, {
      json: true,
    }) as PayloadData;
    return sub;
  }
}
