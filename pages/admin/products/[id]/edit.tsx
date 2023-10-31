import { NextApiRequest } from 'next'
import { useSession } from 'next-auth/react'
import { ProductEdit } from '@/modules/Admin'
import CategoryModel from '../../../../models/Category'
import db from '@/utils/db'
import { CategoryProps, ProductProps } from '@/utils/types'
import PageTransitionLayout from '@/app/layouts/PageTransitionLayout'
import { transformObjectsToJson } from '@/utils/json/transformObjectsToJson'
import ProductModel from '../../../../models/Product'
import AdminAlert from '@/ui/AdminAlert/AdminAlert'

export default function ProductEditPage({
  product,
  categories,
}: {
  product: ProductProps
  categories: CategoryProps[]
}) {
  const session = useSession()

  return (
    <PageTransitionLayout>
      {session.status === 'authenticated' ? (
        <ProductEdit product={product} categories={categories} />
      ) : (
        <AdminAlert title="Sorry, You are not admin" />
      )}
    </PageTransitionLayout>
  )
}

export const getServerSideProps = async (req: NextApiRequest) => {
  const { query } = req
  await db.connect()
  const product = await ProductModel.findOne({ id: query.id }).lean()
  const categories = await CategoryModel.find().lean()

  return {
    props: {
      product: transformObjectsToJson(product),
      categories: transformObjectsToJson(categories),
    },
  }
}
