import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
import formidable from 'formidable';
import { createReadStream } from 'fs';

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: String(process.env.AWS_ACCESS),
    secretAccessKey: String(process.env.AWS_SECRET),
  },
});

export async function sendingS3Amazon(file: formidable.File) {
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
    return {
      url: post.url,
      fileName: Key,
    };
  } catch (error) {
    throw error;
  }
}
