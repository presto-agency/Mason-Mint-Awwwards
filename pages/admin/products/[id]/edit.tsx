import { NextApiRequest } from 'next'
import { ProductEdit } from '@/modules/Admin'
import CategoryModel from '../../../../models/Category'
import db from '@/utils/db'
import { CategoryProps, ProductProps } from '@/utils/types'
import PageTransitionLayout from '@/app/layouts/PageTransitionLayout'
import { transformObjectsToJson } from '@/utils/json/transformObjectsToJson'
import ProductModel from '../../../../models/Product'
import routes from '@/utils/routes'

export default function ProductEditPage({
  product,
  categories,
}: {
  product: ProductProps
  categories: CategoryProps[]
}) {
  return (
    <PageTransitionLayout>
      <ProductEdit product={product} categories={categories} />
    </PageTransitionLayout>
  )
}

export const getServerSideProps = async (req: NextApiRequest) => {
  const { query } = req
  if (process.env.NODE_ENV !== 'development') {
    return {
      redirect: {
        destination: routes.public.designs,
        permanent: false,
      },
    }
  } else {
    await db.connect()
    const product = await ProductModel.findOne({ id: query.id }).lean()
    const categories = await CategoryModel.find().lean()
    // await db.disconnect()
    return {
      props: {
        product: transformObjectsToJson(product),
        categories: transformObjectsToJson(categories),
      },
    }
  }
}
