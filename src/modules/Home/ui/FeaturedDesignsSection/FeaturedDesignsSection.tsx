import { FC } from 'react'
import Link from 'next/link'
import classNames from 'classnames'

import Container from '@/app/layouts/Container'
import { MarqueeCarousel } from '@/components/MarqueeCarousel/MarqueeCarousel'
import { ButtonPrimary } from '@/ui/ButtonPrimary/ButtonPrimary'
import AnimatedText from '@/ui/AnimatedText/AnimatedText'
import AnimatedElement from '@/ui/AnimatedElement/AnimatedElement'

import routes from '@/utils/routes'
import { ProductProps } from '@/utils/types'

import styles from './FeaturedDesignsSection.module.scss'

type FeaturedDesignsSectionProps = {
  className?: string
  products: ProductProps[]
}

const FeaturedDesignsSection: FC<FeaturedDesignsSectionProps> = ({
  className,
  products,
}) => {
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
          <div className="d-none d-md-block col-md-6">
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
      <MarqueeCarousel data={products} className={styles['productMarquee']} />
      <Container>
        <div className="row">
          <div className="d-md-none col-12">
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
    </section>
  )
}

export default FeaturedDesignsSection
