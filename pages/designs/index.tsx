import React, { FC } from 'react'
import Head from 'next/head'
import { GetStaticProps } from 'next'

import { DesignsContent } from '@/modules/Designs'

import { CategoryProps, ProductProps } from '@/utils/types'
import { transformObjectsToJson } from '@/utils/json/transformObjectsToJson'

import CategoryModel from '../../models/Category'
import PageTransitionLayout from '@/app/layouts/PageTransitionLayout'

import db from '@/utils/db'
import Product from '../../models/Product'
import { SusccessResponse } from '@/modules/Designs/api/products'

type DesignsProps = {
  products: SusccessResponse<ProductProps[]>
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

  //@ts-ignore for some reason doesn't see paginate method
  const products = await Product.paginate(
    {},
    {
      page: 1,
      limit: 10,
      sort: { 'category.name': 1, _id: 1 },
      lean: true,
    }
  )
  const categories = await CategoryModel.find().sort({ name: 1 })

  return {
    props: {
      products: {
        success: true,
        data: transformObjectsToJson(products),
      },
      categories: transformObjectsToJson(categories),
    },
  }
}

export default Index
