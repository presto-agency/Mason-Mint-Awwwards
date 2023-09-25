import { FC, useEffect, useState } from 'react'
import classNames from 'classnames'
import axios from 'axios'
import Link from 'next/link'
import ProductCarousel from '@/ui/ProductCarousel/ProductCarousel'
import { ButtonPrimary } from '@/ui/ButtonPrimary/ButtonPrimary'
import AnimatedText from '@/ui/AnimatedText/AnimatedText'
import { ProductProps } from '@/utils/types'
import AnimatedElement from '@/ui/AnimatedElement/AnimatedElement'
import Container from '@/app/layouts/Container'
import routes from '@/utils/routes'

import styles from './FeaturedDesignsSection.module.scss'

const FeaturedDesignsSection: FC<{ className?: string }> = ({ className }) => {
  const [products, setProducts] = useState<ProductProps[]>([])

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `/api/products?category=64b7f098ffe22650abb78018`
        )
        setProducts(res.data.data.docs)
      } catch (error) {
        console.log(error)
      }
    }

    fetchProduct()
  }, [])

  return (
    <section className={classNames(styles['featureDesigns'], className)}>
      <Container>
        <div className="row">
          <div className="col-md-6">
            <p className={styles['featureDesigns__subtitle']}>
              <AnimatedText>Our designs</AnimatedText>
            </p>
            <p className={classNames(styles['featureDesigns__title'], 'h2')}>
              <AnimatedText title withBlueDot>
                Featured Designs
              </AnimatedText>
            </p>
          </div>
          <div className="col-md-6">
            <div className={styles['featureDesigns__actions']}>
              <AnimatedElement delay={0}>
                <Link scroll={false} href={routes.public.designs}>
                  <ButtonPrimary variant="transparent">View all</ButtonPrimary>
                </Link>
              </AnimatedElement>
            </div>
          </div>
        </div>
      </Container>
      {products.length > 0 ? (
        <ProductCarousel data={products} showResults={false} />
      ) : null}
    </section>
  )
}

export default FeaturedDesignsSection
