import React, { FC } from 'react'
import Head from 'next/head'
import { GetStaticProps } from 'next'

import { DesignsContent } from '@/modules/Designs'

import db from '@/utils/db'
import { CategoryProps, ProductProps } from '@/utils/types'
import { transformObjectsToJson } from '@/utils/json/transformObjectsToJson'

import CategoryModel from '../../models/Category'
import ProductTestModel from '../../models/Product'
import PageTransitionLayout from '@/app/layouts/PageTransitionLayout'

type DesignsProps = {
  categories: CategoryProps[]
  products: ProductProps[]
}

const Index: FC<DesignsProps> = ({ categories, products }) => {
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
        <DesignsContent products={products} categories={categories} />
      </PageTransitionLayout>
    </>
  )
}

export const getStaticProps: GetStaticProps<{
  categories: CategoryProps[]
  products: ProductProps[]
}> = async () => {
  await db.connect()
  const categories = await CategoryModel.find().lean()
  const products = await ProductTestModel.find().lean()

  return {
    props: {
      categories: transformObjectsToJson(categories),
      products: transformObjectsToJson(products),
    },
  }
}

export default Index
