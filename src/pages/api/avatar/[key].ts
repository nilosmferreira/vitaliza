import { NextApiRequest, NextApiResponse } from 'next';

export default function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { key } = req.query;
    return res.redirect(
      `https://vitaliza-files.s3.us-east-1.amazonaws.com/${key}`
    );
  }
}
