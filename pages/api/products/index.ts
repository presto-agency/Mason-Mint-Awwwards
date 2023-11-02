import { NextApiResponse, NextApiRequest } from 'next'
import db from '@/utils/db'
import { getError } from '@/utils/error'
import Product from '../../../models/Product'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { category = null, search = '' },
  } = req

  const categories: string[] = category ? category.toString().split(',') : []
  const filter: {
    'category.id'?: string[]
    ProductName?: object
  } = {}

  if (categories.length) {
    filter['category.id'] = categories
  }

  if (search) {
    filter.ProductName = { $regex: search, $options: 'i' }
  }

  try {
    await db.connect()
    const products = await Product.find(filter)
    // await db.disconnect()
    res.status(200).json({ success: true, data: products })
  } catch (error) {
    res.status(500).json({ success: false, message: getError(error as Error) })
  }
}

export default handler
