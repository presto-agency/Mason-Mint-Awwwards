import React, { FC } from 'react'
import classNames from 'classnames'
import Container from '@/app/layouts/Container'
import AnimatedText from '@/ui/AnimatedText/AnimatedText'
import { BackgroundImage } from '@/ui/BackgroundImage/BackgroundImage'
import ParallaxSection from '@/ui/ParallaxSection/ParallaxSection'

import styles from './WasBorn.module.scss'

const WasBorn: FC<{ className?: string }> = ({ className }) => {
  return (
    <section className={classNames(styles['WasBorn'], className)}>
      <Container>
        <h2 className={classNames('h2', styles['title'])}>
          <AnimatedText title>
            Mason Mint was born from the idea of producing world-class custom
            minted silver products.
          </AnimatedText>
        </h2>
        <div className={styles['WasBorn__content']}>
          <ParallaxSection>
            <div className={styles['WasBorn__content_left']}>
              <BackgroundImage
                className={styles['image']}
                parallax
                cover
                src="/images/about/pict_1.jpg"
                alt="image"
                description="What we believe"
              />
            </div>
          </ParallaxSection>
          <ParallaxSection parallaxValues={[300, -100]}>
            <div className={styles['WasBorn__content_right']}>
              <BackgroundImage
                className={styles['image']}
                parallax
                cover
                src="/images/about/pict_2.jpg"
                alt="image"
              />
              <h4 className={classNames('h4', styles['description'])}>
                <AnimatedText title>
                  Our motto &quot;Excellence In Minting&quot; are words that we
                  live by. Our high standards for quality and design is what
                  separates us from everyone else.
                </AnimatedText>
              </h4>
              <p style={{ color: 'var(--gray-800)' }}>
                <AnimatedText>
                  We look forward to supplying both the investor and collector
                  silver market with superior products that are sure to impress.
                </AnimatedText>
              </p>
            </div>
          </ParallaxSection>
        </div>
      </Container>
    </section>
  )
}

export default WasBorn
