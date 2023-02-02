// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import formidable from 'formidable';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: string;
};

export const config = {
  api: {
    bodyParser: false,
  },
};
async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const form = new formidable.IncomingForm();
  form.parse(req, (error, fields, files) => {
    console.log('error', error);
    const data = JSON.parse(String(fields['data']));
    console.log(data);
    console.log(files);
    res.status(200).json({ name: 'John Doe' });
  });
}

export default handler;
