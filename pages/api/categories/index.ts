import { NextApiRequest, NextApiResponse } from 'next'
import db from '@/utils/db'
import CategoryModel from '../../../models/Category'
import { getError } from '@/utils/error'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await db.connect()
    const categories = await CategoryModel.find()
    // await db.disconnect()
    res.status(200).json({
      success: true,
      data: categories,
    })
  } catch (error) {
    res.status(500).json({ success: false, message: getError(error as Error) })
  }
}

export default handler
