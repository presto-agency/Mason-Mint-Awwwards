import React, { FC } from 'react'
import classNames from 'classnames'
import Link from 'next/link'
import Container from '@/app/layouts/Container'
import { BackgroundImage } from '@/ui/BackgroundImage/BackgroundImage'
import { ButtonPrimary } from '@/ui/ButtonPrimary/ButtonPrimary'
import AnimatedElement from '@/ui/AnimatedElement/AnimatedElement'
import AnimatedText from '@/ui/AnimatedText/AnimatedText'
import ParallaxSection from '@/ui/ParallaxSection/ParallaxSection'
import routes from '@/utils/routes'

import styles from './NaturalVehicle.module.scss'

const NaturalVehicle: FC<{ className?: string }> = ({ className }) => {
  return (
    <section className={classNames(styles['NaturalVehicle'], className)}>
      <ParallaxSection className={styles['NaturalVehicle__abstract']} />
      <Container>
        <div className={styles['NaturalVehicle__content']}>
          <ParallaxSection
            parallaxValues={[0, -40]}
            className={styles['NaturalVehicle__content_left']}
          >
            <h3 className={classNames('h3', styles['title'])}>
              <AnimatedText title>
                The packaging is a natural vehicle for telling the story behind
                each coin.
              </AnimatedText>
            </h3>
            <p className={styles['description']}>
              <AnimatedText>
                Thanks to Mason Mint&apos;s solutions for the storage,
                protection and, most importantly, presentation of our silver
                rounds and bars, authorized distributors have the opportunity to
                enhance their customers experience while increasing the products
                value.
              </AnimatedText>
            </p>
            <BackgroundImage
              className={styles['image']}
              parallax
              cover
              src="/images/packaging/pack_2.jpg"
              alt="image"
              description="Packaging"
            />
          </ParallaxSection>
          <ParallaxSection parallaxValues={[300, -100]}>
            <div className={styles['NaturalVehicle__content_right']}>
              <BackgroundImage
                className={styles['image']}
                cover
                src="/images/packaging/pack.png"
                alt="image"
              />
              <h4 className={classNames(styles['title'], 'h4')}>
                <AnimatedText title>
                  While creating its packaging, Mason Mint applies the knowledge
                  and know-how from over a decade of product-development work.
                  Your options are limitless for creating the perfect packaging
                  to match your minted silver products.
                </AnimatedText>
              </h4>
              <p className={styles['description']}>
                <AnimatedText>
                  Our company&apos;s innovative and uncompromising approach to
                  both design and quality has made packaging for Mason Mint
                  coins and bars an integral part of its premium products,
                  creating a new benchmark for quality.
                </AnimatedText>
              </p>
              <AnimatedElement
                className={styles['buttonContainer']}
                delay={0.2}
              >
                <Link scroll={false} href={routes.public.contactUs}>
                  <ButtonPrimary
                    className={styles['button']}
                    variant="transparent"
                  >
                    Contact Us
                  </ButtonPrimary>
                </Link>
              </AnimatedElement>
            </div>
          </ParallaxSection>
        </div>
      </Container>
    </section>
  )
}

export default NaturalVehicle
