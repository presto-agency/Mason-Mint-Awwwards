import React, { FC } from 'react'
import Container from '@/app/layouts/Container'
import { BackgroundImage } from '@/ui/BackgroundImage/BackgroundImage'
import classNames from 'classnames'
import AnimatedText from '@/ui/AnimatedText/AnimatedText'
import ParallaxSection from '@/ui/ParallaxSection/ParallaxSection'

import styles from './WhatWeDo.module.scss'

const WhatWeDo: FC<{ className?: string }> = ({ className }) => {
  return (
    <section className={classNames(styles['WhatWeDo'], className)}>
      <ParallaxSection
        className={styles['WhatWeDo__abstract']}
        parallaxValues={[-200, 200]}
      />
      <Container>
        <div className={styles['WhatWeDo__content']}>
          <div className={styles['WhatWeDo__content_left']}>
            <BackgroundImage
              className={styles['imageDescription']}
              parallax
              cover
              src="/images/about/best_1.jpg"
              alt="image"
              description="our team"
            />
          </div>
          <ParallaxSection parallaxValues={[300, -100]}>
            <div className={styles['WhatWeDo__content_right']}>
              <div className={styles['descriptionContainer']}>
                <h2 className={classNames('h2', styles['title'])}>
                  <AnimatedText title withBlueDot>
                    What we do best
                  </AnimatedText>
                </h2>
                <p className={classNames(styles['subtitle'], 'h4')}>
                  <AnimatedText>
                    With over 40 years of combined experience in the precious
                    metal industry, Mason Mint employs a highly skilled team who
                    utilize the latest in minting technology.
                  </AnimatedText>
                </p>
                <p style={{ color: 'var(--gray-800)' }}>
                  <AnimatedText>
                    We are not just another mint, but a company of passionate
                    individuals with the common goal of bringing world class
                    products to market.
                  </AnimatedText>
                </p>
              </div>
              <BackgroundImage
                className={styles['imageDescription']}
                parallax
                cover
                src="/images/about/best_1.jpg"
                alt="image"
                description="our team"
              />
              <BackgroundImage
                className={styles['image']}
                parallax
                cover
                src="/images/about/best_2.jpg"
                alt="image"
              />
            </div>
          </ParallaxSection>
        </div>
      </Container>
    </section>
  )
}

export default WhatWeDo
