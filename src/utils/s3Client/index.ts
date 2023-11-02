import { S3 } from '@aws-sdk/client-s3'

const s3Client = new S3({
  forcePathStyle: false,
  endpoint: 'https://nyc3.digitaloceanspaces.com',
  region: 'us-east-1',
  credentials: {
    accessKeyId: process.env.CLOUD_ACCESS_KEY as string,
    secretAccessKey: process.env.CLOUD_SECRET_KEY as string,
  },
})

export { s3Client }
