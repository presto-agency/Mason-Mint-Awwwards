import { ImageToUpload } from '@/utils/types'
import { s3Client } from '@/utils/s3Client/index'
import { PutObjectCommand } from '@aws-sdk/client-s3'

export const uploadFile = async (image: ImageToUpload) => {
  if (image.file) {
    try {
      const data = await s3Client.send(
        new PutObjectCommand({
          Bucket: process.env.CLOUD_BUCKET,
          ACL: 'public-read',
          Key: image.file?.name,
          Body: image.file as File,
          ContentType: image.file?.type,
        })
      )
      return data.$metadata.httpStatusCode === 200 ? image.file?.name : null
    } catch (error) {
      console.error('Error on upload file ', error)
    }
  }
  return null
}
