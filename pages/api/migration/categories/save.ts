// import { NextApiRequest, NextApiResponse } from 'next'
// import { ObjectId } from 'mongodb'
// import db from '@/utils/db'
// import dataJson from '../../../../categories.json'
// import CategoryModel from '../../../../models/Category'
// import { getError } from '@/utils/error'
//
// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
//   try {
//     await db.connect()
//     await CategoryModel.deleteMany()
//
//     const categories = dataJson.map((category) => {
//       const _id = new ObjectId()
//       return {
//         ...category,
//         _id,
//         id: _id.toString(),
//       }
//     })
//     await CategoryModel.insertMany(categories)
//     await db.disconnect()
//     res.status(200).json({
//       success: true,
//       data: categories,
//     })
//   } catch (error) {
//     res.status(500).json({ success: false, message: getError(error as Error) })
//   }
// }
//
// export default handler
