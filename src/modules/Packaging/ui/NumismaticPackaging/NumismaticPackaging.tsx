import React, { FC } from 'react'
import dynamic from 'next/dynamic'
import classNames from 'classnames'
import Container from '@/app/layouts/Container'
import AnimatedText from '@/ui/AnimatedText/AnimatedText'

import { MarqueeCarouselPhoto } from '@/components/MarqueeCarousel/MarqueeCarouselPhoto'

const ParallaxSection = dynamic(
  () => import('@/ui/ParallaxSection/ParallaxSection'),
  { ssr: false }
)

import styles from './NumismaticPackaging.module.scss'

const data = [
  {
    url: '/images/packaging/slide_1.png',
    id: 1,
  },
  {
    url: '/images/packaging/slide_2.png',
    id: 2,
  },
  {
    url: '/images/packaging/slide_3.png',
    id: 3,
  },
  {
    url: '/images/packaging/slide_4.png',
    id: 4,
  },
]

const NumismaticPackaging: FC<{ className?: string }> = ({ className }) => {
  return (
    <section className={classNames(styles['NumismaticPackaging'], className)}>
      <ParallaxSection className={styles['NumismaticPackaging__abstract']} />
      <Container>
        <div className={styles['NumismaticPackaging__content']}>
          <div className={styles['NumismaticPackaging__content_left']}>
            <h2 className={classNames('h2', styles['title'])}>
              <AnimatedText title>
                Contact us to find out more about our bespoke packaging and
                custom minting offers. We&apos;re ready to discuss innovative
                new projects with you!
              </AnimatedText>
            </h2>
          </div>
          <div className={styles['NumismaticPackaging__content_right']}>
            <p className={styles['description']}>
              <AnimatedText>
                No matter what your idea is, we&apos;re here to help. Put your
                design and your organization on the map with custom packaging.
              </AnimatedText>
            </p>
            <p className={styles['description']}>
              <AnimatedText>
                From concept, to prototype, to volume production.
              </AnimatedText>
            </p>
          </div>
        </div>
      </Container>
      <MarqueeCarouselPhoto data={data} />
    </section>
  )
}

export default NumismaticPackaging
