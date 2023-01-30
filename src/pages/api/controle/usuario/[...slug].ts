import { NextApiRequest, NextApiResponse } from 'next';

export default function handle(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.query.slug);
  return res.status(200).end();
}
