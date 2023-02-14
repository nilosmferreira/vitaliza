import formidable from 'formidable';
import { IncomingForm } from 'formidable';
import { NextApiRequest } from 'next';

export const parseForm = (req: NextApiRequest) =>
  new Promise<[fields: formidable.Fields, files: formidable.Files]>(
    (resolve, rejects) => {
      const incomingForm = new IncomingForm();
      incomingForm.parse(req, (err, fields, files) =>
        err ? rejects(err) : resolve([fields, files])
      );
    }
  );
