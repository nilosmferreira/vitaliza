import { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';

const cors = Cors({
  methods: ['GET'],
});
function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await runMiddleware(req, res, cors);
  if (req.method === 'GET') {
    const { key } = req.query;
    // return res.redirect(
    //   `https://vitaliza-files.s3.us-east-1.amazonaws.com/${key}`
    // );
    fetch(`https://vitaliza-files.s3.us-east-1.amazonaws.com/${key}`, {
      method: 'GET',
    }).then((response) => {
      return res
        .setHeader('Content-Type', String(response.headers.get('Content-Type')))
        .status(response.status)
        .send(response.body);
      // return response;
    });
  }
}
