import React, { FC } from 'react'
import Head from 'next/head'
import { GetStaticProps } from 'next'

import { DesignsContent, getProducts } from '@/modules/Designs'

import { CategoryProps } from '@/utils/types'
import { transformObjectsToJson } from '@/utils/json/transformObjectsToJson'

import CategoryModel from '../../models/Category'
import PageTransitionLayout from '@/app/layouts/PageTransitionLayout'
import { QueryClient, dehydrate } from 'react-query'
import db from '@/utils/db'

type DesignsProps = {
  categories: CategoryProps[]
}

const Index: FC<DesignsProps> = ({ categories }) => {
  return (
    <>
      <Head>
        <title>Mason Mint Category | Mason Mint</title>
        <meta
          name="description"
          content="Find Mason Mint silver rounds and silver bullion products from precious metal wholesalers. We live by our motto, Excellence in Minting!"
        />
      </Head>
      <PageTransitionLayout>
        <DesignsContent categories={categories} />
      </PageTransitionLayout>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient()
  await db.connect()
  await queryClient.prefetchQuery('getProducts', () => getProducts(1, {}))
  const categories = await CategoryModel.find().sort({ name: 1 })

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      categories: transformObjectsToJson(categories),
    },
  }
}

// export const getStaticProps: GetStaticProps<{
//   categories: CategoryProps[]
//   products: ProductProps[]
// }> = async () => {
//   await db.connect()
//   const categories = await CategoryModel.find().lean()
//   const products = await ProductTestModel.find().lean()

//   return {
//     props: {
//       categories: transformObjectsToJson(categories),
//       products: transformObjectsToJson(products),
//     },
//   }
// }

export default Index
