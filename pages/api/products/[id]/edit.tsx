import { NextApiResponse, NextApiRequest } from 'next'
import db from '@/utils/db'
import CategoryModel from '../../../../models/Category'
import { getError } from '@/utils/error'
import { ProductProps } from '@/utils/types'
import ProductTestModel from '../../../../models/Product'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'PUT') {
    res.status(400).json({ success: false, message: 'Invalid request method' })
    return
  }
  try {
    const productId = req.query.id
    const body = req.body
    const categoryId = body.category?.id

    if (categoryId) {
      const category = await CategoryModel.findOne({ id: categoryId })

      const existProductInCategory = category.products.some(
        (product: ProductProps) => product.id === productId
      )

      if (!existProductInCategory) {
        category.products.push({
          name: body.ProductName,
          id: productId,
        })
        await category.save()
      }
    }

    await db.connect()
    let product = await ProductTestModel.findOneAndUpdate(
      { id: productId },
      body
    )
    product = await ProductTestModel.findOne({ id: productId })
    // await db.disconnect()
    res.status(200).json({ success: true, data: product })
  } catch (error) {
    res.status(500).json({ success: false, message: getError(error as Error) })
  }
}

export default handler
