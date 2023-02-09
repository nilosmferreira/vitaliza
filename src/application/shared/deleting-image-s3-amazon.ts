import { DeleteObjectCommand } from '@aws-sdk/client-s3';
import { s3Client } from './s3-client';

export async function deletingS3Amazon(Key: string) {
  const deleteCommand = new DeleteObjectCommand({
    Bucket: String(process.env.AWS_BUCKET_NAME),
    Key,
  });

  const response = await s3Client.send(deleteCommand);
  return response;
}
