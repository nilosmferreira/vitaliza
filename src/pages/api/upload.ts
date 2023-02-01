import {
  PutObjectAclCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';

import formidable from 'formidable';
import { NextApiRequest, NextApiResponse } from 'next';
import { createReadStream } from 'fs';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: String(process.env.AWS_ACCESS),
    secretAccessKey: String(process.env.AWS_SECRET),
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};
async function handle(req: NextApiRequest, res: NextApiResponse) {
  const form = new formidable.IncomingForm({
    maxFileSize: 1 * 1024 * 1024,
    maxFields: 1,
  });
  form.parse(req, async (err, fields, files) => {
    if (!files['image']) {
      return res.status(400).end();
    }
    const file = files['image'] as formidable.File;
    const stream = createReadStream(file.filepath);
    const Key = `${file.newFilename}-${file.originalFilename}`;
    const uploadCommand = new PutObjectCommand({
      Bucket: String(process.env.AWS_BUCKET_NAME),
      Key,
      ContentType: String(file.mimetype),
      Body: stream,
      ACL: 'public-read',
    });
    try {
      const response = await s3Client.send(uploadCommand);
      const post = await createPresignedPost(s3Client, {
        Bucket: String(process.env.AWS_BUCKET_NAME),
        Key,
      });

      res.status(200).json({ ...response, ...post });
    } catch (errors3) {
      res.status(400).json(errors3);
    }
  });
}
export default handle;
