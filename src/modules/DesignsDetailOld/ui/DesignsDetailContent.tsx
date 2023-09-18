import React, { useEffect, useState, useContext } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import Link from 'next/link'
import axios from 'axios'

import routes from '@/utils/routes'
import { ProductProps } from '@/utils/types'

import { Store } from '@/utils/Store'
import Container from '@/app/layouts/Container'
import { ButtonPrimary } from '@/ui/ButtonPrimary/ButtonPrimary'

import DesignsDetailDescription from './DesignsDetailDescription/DesignsDetailDescription'
import DesignsDetailThumbnail from './DesignsDetailThumbnail/DesignsDetailThumbnail'

const DesignsDetailGallery = dynamic(
  () => import('./DesignsDetailGallery/DesignsDetailGallery'),
  { ssr: false }
)
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
        <Container>
          <div className="row">
            <div className="col-md-5">
              <div className={styles['detail__nav']}>
                <Link scroll={false} href={routes.public.designs}>
                  <ButtonPrimary backwardArrows variant="noStroked">
                    Go to back
                  </ButtonPrimary>
                </Link>
              </div>
              <DesignsDetailThumbnail
                className={styles['detail__thumbnail']}
                product={product}
              />
            </div>
            <div className="col-md-5 offset-md-1">
              {product && (
                <DesignsDetailDescription
                  className={styles['detail__description']}
                  product={product}
                />
              )}
            </div>
          </div>
          {product?.additionalImages && product.additionalImages.length > 0 ? (
            <DesignsDetailGallery
              className={styles['detail__gallery']}
              product={product}
            />
          ) : null}
        </Container>
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
