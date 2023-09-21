import React, { FC } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'

import DesignsDetailHero from './DesignsDetailHero/DesignsDetailHero'
import DesignsDetailSpecifications from './DesignsDetailSpecifications/DesignsDetailSpecifications'

import { ProductProps } from '@/utils/types'

import styles from './DesignsDetailContent.module.scss'

const BecomeDistributorSection = dynamic(
  () => import('@/components/BecomeDistributorSection/BecomeDistributorSection')
)
const ProductCarousel = dynamic(
  () => import('@/ui/ProductCarousel/ProductCarousel')
)

type DesignDetailProps = {
  product: ProductProps
  sameProducts: ProductProps[]
}

const DesignsDetailContent: FC<DesignDetailProps> = ({
  product,
  sameProducts,
}) => {
  return (
    <>
      <Head>
        <title>{product?.ProductName} | Mason Mint</title>
      </Head>
      <main className={styles['detail']}>
        <DesignsDetailHero product={product} />
        <DesignsDetailSpecifications product={product} />
        {sameProducts.length > 0 && (
          <ProductCarousel
            className={styles['detail__carousel']}
            title="Сoins from this category."
            titleWithBlueDot={false}
            subtitle={product?.category?.name}
            data={sameProducts}
            showResults={false}
            reloadPageOnCardClick={true}
          />
        )}
        <BecomeDistributorSection />
      </main>
    </>
  )
}

export default DesignsDetailContent
