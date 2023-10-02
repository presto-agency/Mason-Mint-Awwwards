import { FC } from 'react'
import PageTransitionLayout from '@/app/layouts/PageTransitionLayout'
import { DesignsDetailContent } from '@/modules/DesignDetail'
import { GetStaticPaths, GetStaticProps } from 'next'

import ProductTestModel from '../../../models/Product'

import { transformObjectsToJson } from '@/utils/json/transformObjectsToJson'
import { ProductProps } from '@/utils/types'
import db from '@/utils/db'
import { MarqueCarouselWrapper } from '@/components/MarqueeCarousel/MarqueeCarouselWrapper'

type DesignDetailProps = {
  product: ProductProps
  sameProducts: ProductProps[]
}

const Index: FC<DesignDetailProps> = ({ product, sameProducts }) => {
  return (
    <PageTransitionLayout>
      <MarqueCarouselWrapper>
        <DesignsDetailContent product={product} sameProducts={sameProducts} />
      </MarqueCarouselWrapper>
    </PageTransitionLayout>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const productId = context.params?.productId as string
  await db.connect()
  const product = await ProductTestModel.findById(productId)
  const sameProducts = await ProductTestModel.find({
    'category.id': product.category?.id,
    id: { $not: { $eq: product.id } },
  })

  return {
    props: {
      product: transformObjectsToJson(product),
      sameProducts: transformObjectsToJson(sameProducts),
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export default Index
