import { NextApiResponse, NextApiRequest } from 'next'
import db from '@/utils/db'
import { getError } from '@/utils/error'
import ProductModel from '../../../../models/Product'
import CategoryModel from '../../../../models/Category'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'DELETE') {
    res.status(400).json({ success: false, message: 'Invalid request method' })
    return
  }
  try {
    const productId = req.query.id
    const { category: productCategory = {} } = await ProductModel.findById(
      productId
    )
    const categoryId = productCategory.id || null

    if (categoryId) {
      const category = await CategoryModel.findById(productCategory.id)
      if (category && category.products) {
        const productIndex = category.products.findIndex(
          (product: { name: string; id: string }) => product.id === productId
        )

        if (productIndex !== -1) {
          category.products.splice(productIndex, 1)

          await category.save()
        }
      }
    }

    await db.connect()

    const deletedProduct = await ProductModel.findByIdAndDelete(productId)

    res.status(200).json({ success: true, data: deletedProduct })
  } catch (error) {
    res.status(500).json({ success: false, message: getError(error as Error) })
  }
}

export default handler
