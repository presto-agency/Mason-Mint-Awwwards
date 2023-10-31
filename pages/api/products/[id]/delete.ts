import { NextApiResponse, NextApiRequest } from 'next'
import db from '@/utils/db'
import { getError } from '@/utils/error'
import ProductModel from '../../../../models/Product'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'DELETE') {
    res.status(400).json({ success: false, message: 'Invalid request method' })
    return
  }
  try {
    const productId = req.query.id

    await db.connect()

    const deletedProduct = await ProductModel.findByIdAndDelete(productId)

    res.status(200).json({ success: true, data: deletedProduct })
  } catch (error) {
    res.status(500).json({ success: false, message: getError(error as Error) })
  }
}

export default handler
