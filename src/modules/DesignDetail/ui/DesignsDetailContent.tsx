import React, { FC, useContext } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'

import DesignsDetailHero from './DesignsDetailHero/DesignsDetailHero'
import DesignsDetailSpecifications from './DesignsDetailSpecifications/DesignsDetailSpecifications'
import {
  MarqueCarouselContext,
  MarqueCarouselContextType,
} from '@/components/MarqueeCarousel/MarqueeCarouselWrapper'

import { ProductProps } from '@/utils/types'

import styles from './DesignsDetailContent.module.scss'
import DesignsDetailSameProducts from './DesignsDetailSameProducts/DesignsDetailSameProducts'

const BecomeDistributorSection = dynamic(
  () => import('@/components/BecomeDistributorSection/BecomeDistributorSection')
)

type DesignDetailProps = {
  product: ProductProps
  sameProducts: ProductProps[]
}

const DesignsDetailContent: FC<DesignDetailProps> = ({
  product,
  sameProducts,
}) => {
  const { onWheel } = useContext(
    MarqueCarouselContext
  ) as MarqueCarouselContextType

  return (
    <>
      <Head>
        <title>{product?.ProductName} | Mason Mint</title>
      </Head>
      <main className={styles['detail']} onWheel={onWheel}>
        <DesignsDetailHero product={product} />
        <DesignsDetailSpecifications product={product} />
        {sameProducts.length > 0 && (
          <DesignsDetailSameProducts
            products={sameProducts}
            category={product.category?.name}
          />
        )}
        <BecomeDistributorSection />
      </main>
    </>
  )
}

export default DesignsDetailContent
