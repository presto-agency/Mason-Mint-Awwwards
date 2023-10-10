import React, { FC } from 'react'
import { GetStaticProps } from 'next'
import Head from 'next/head'

import PageTransitionLayout from '@/app/layouts/PageTransitionLayout'
import { DesignsContent } from '@/modules/Designs'

import db from '@/utils/db'
import { CategoryProps, ProductProps } from '@/utils/types'
import { transformObjectsToJson } from '@/utils/json/transformObjectsToJson'

import CategoryModel from '../../models/Category'
import Product from '../../models/Product'

type DesignsProps = {
  products: ProductProps[]
  categories: CategoryProps[]
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
        <DesignsContent categories={categories} products={products} />
      </PageTransitionLayout>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  await db.connect()

  const products = await Product.find()
    .sort({ 'category.name': 1, _id: 1 })
    .lean()

  const categories = await CategoryModel.find().sort({ name: 1 })

  return {
    props: {
      products: transformObjectsToJson(products),
      categories: transformObjectsToJson(categories),
    },
  }
}

export default Index
