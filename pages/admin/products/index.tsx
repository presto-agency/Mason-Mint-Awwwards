import { AdminProducts } from '@/modules/Admin'
import db from '@/utils/db'
import { transformObjectsToJson } from '@/utils/json/transformObjectsToJson'
import PageTransitionLayout from '@/app/layouts/PageTransitionLayout'
import { ProductProps } from '@/utils/types'
import ProductModel from '../../../models/Product'
import routes from '@/utils/routes'

type ProductsPageProps = {
  products: ProductProps[]
}

export default function ProductsPage({ products }: ProductsPageProps) {
  return (
    <PageTransitionLayout>
      <AdminProducts products={products} />
    </PageTransitionLayout>
  )
}

export const getServerSideProps = async () => {
  if (process.env.NODE_ENV !== 'development') {
    return {
      redirect: {
        destination: routes.public.designs,
        permanent: false,
      },
    }
  } else {
    await db.connect()
    const products = await ProductModel.find().lean()
    // await db.disconnect()
    return {
      props: {
        products: transformObjectsToJson(products),
      },
    }
  }
}
