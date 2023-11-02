import Head from 'next/head'
import { HomeContent } from '@/modules/Home'
import PageTransitionLayout from '../src/app/layouts/PageTransitionLayout'
import Product from '../models/Product'
import { transformObjectsToJson } from '@/utils/json/transformObjectsToJson'
import { ProductProps } from '@/utils/types'
import { FC } from 'react'
import db from '@/utils/db'
import { MarqueCarouselWrapper } from '@/components/MarqueeCarousel/MarqueeCarouselWrapper'

type HomeProps = {
  products: ProductProps[]
}

const Home: FC<HomeProps> = ({ products }) => {
  return (
    <>
      <Head>
        <title>Mason Mint Silver Coins and Rounds</title>
      </Head>
      <PageTransitionLayout>
        <MarqueCarouselWrapper>
          <HomeContent products={products} />
        </MarqueCarouselWrapper>
      </PageTransitionLayout>
    </>
  )
}

export const getStaticProps = async () => {
  await db.connect()
  const products = await Product.find({
    // isFeatured: true,
  })

  return {
    props: {
      products: transformObjectsToJson(products),
    },
  }
}

export default Home
