import React, { useEffect, useState, useContext } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

import axios from 'axios'

import { ProductProps } from '@/utils/types'

import { Store } from '@/utils/Store'

const BecomeDistributorSection = dynamic(
  () =>
    import('@/components/BecomeDistributorSection/BecomeDistributorSection'),
  { ssr: false }
)
const ProductCarousel = dynamic(
  () => import('@/ui/ProductCarousel/ProductCarousel'),
  { ssr: false }
)

import styles from './DesignsDetailContent.module.scss'
import DesignsDetailHero from './DesignsDetailHero/DesignsDetailHero'

const DesignsDetailContent = () => {
  const {
    query: { productId },
  } = useRouter()
  const store = useContext(Store)
  const [product, setProduct] = useState<ProductProps | null>(null)
  const [sameProducts, setSameProducts] = useState<ProductProps[]>([])

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/api/products/${productId}`)
        setProduct(res.data.data)
      } catch (error) {
        console.log(error)
      }
    }

    if (
      productId &&
      store?.state.products &&
      store?.state.products.length > 0
    ) {
      setProduct(
        store.state.products.filter((p) => p.id === productId)[0] || null
      )
    } else if (productId) {
      fetchProduct()
    }
  }, [productId, store?.state.products])

  useEffect(() => {
    const fetchSameProducts = async () => {
      if (product) {
        try {
          const res = await axios.get(
            `/api/products?category=${product?.category?.id}`
          )
          setSameProducts(
            res.data.data.filter((p: ProductProps) => p.id !== productId)
          )
        } catch (error) {
          console.log(error)
        }
      }
    }

    if (store?.state.products && store?.state.products.length > 0 && product) {
      const sameProductsFromStore = store.state.products
        .filter((p) => p.category?.id === product?.category?.id)
        .filter((p) => p.id !== productId)
      setSameProducts(sameProductsFromStore)
    } else {
      fetchSameProducts()
    }
  }, [product, productId, store?.state.products])

  return (
    <>
      <Head>
        <title>{product?.ProductName} | Mason Mint</title>
      </Head>
      <main className={styles['detail']}>
        {product && <DesignsDetailHero product={product} />}
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
