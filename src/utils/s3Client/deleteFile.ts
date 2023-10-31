import { DeleteObjectCommand } from '@aws-sdk/client-s3'
import { s3Client } from '@/utils/s3Client/index'

export const deleteFile = async (fileName = '') => {
  try {
    return s3Client.send(
      new DeleteObjectCommand({
        Bucket: process.env.CLOUD_BUCKET,
        Key: fileName as string,
      })
    )
  } catch (error) {
    console.error('Error on delete file - ', error)
  }
}
