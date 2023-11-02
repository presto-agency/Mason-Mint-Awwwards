import { NextApiRequest } from 'next'
import PageTransitionLayout from '@/app/layouts/PageTransitionLayout'
import ProductCreate from '@/modules/Admin/ui/ProductCreate/ProductCreate'
import { transformObjectsToJson } from '@/utils/json/transformObjectsToJson'
import { CategoryProps } from '@/utils/types'
import CategoryModel from '../../../models/Category'
import db from '@/utils/db'

const ProductCreatePage = ({ categories }: { categories: CategoryProps[] }) => {
  return (
    <PageTransitionLayout>
      <ProductCreate categories={categories} />
    </PageTransitionLayout>
  )
}

export default ProductCreatePage

export const getServerSideProps = async (req: NextApiRequest) => {
  await db.connect()
  const categories = await CategoryModel.find().lean()

  return {
    props: {
      categories: transformObjectsToJson(categories),
    },
  }
}
