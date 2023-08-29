import React, { FC } from 'react'
import classNames from 'classnames'
import Container from '@/app/layouts/Container'
import { BackgroundImage } from '@/ui/BackgroundImage/BackgroundImage'
import AnimatedText from '@/ui/AnimatedText/AnimatedText'
import AnimatedElement from '@/ui/AnimatedElement/AnimatedElement'
import AnimateScaleBg from '@/ui/AnimateScaleBG/AnimateScaleBG'
import useWindowDimensions from '@/hooks/useWindowDimensions'

import styles from './HeroDetail.module.scss'

type HeroDetail = {
  className?: string
  topDescription?: string
  bottomDescription?: string
  image: string
  sliderImages: string[]
}

const HeroDetail: FC<HeroDetail> = ({
  className,
  topDescription,
  bottomDescription,
  image,
  sliderImages,
}) => {
  const { width } = useWindowDimensions()

  return (
    <section className={classNames(styles['HeroDetail'], className)}>
      <AnimatedElement delay={0.2} className={styles['HeroDetail__image']}>
        {width > 767 ? (
          <AnimateScaleBg images={sliderImages} />
        ) : (
          <BackgroundImage
            className={styles['image']}
            parallax
            cover
            src={image}
            alt="image"
          />
        )}
      </AnimatedElement>
      {topDescription || bottomDescription ? (
        <Container className={styles['container']}>
          <div className={styles['HeroDetail__content']}>
            <div className={styles['HeroDetail__content_description']}>
              <h4 className={classNames('h4', styles['title'])}>
                <AnimatedText>{`${topDescription}`}</AnimatedText>
              </h4>
              <p className={styles['subtitle']}>
                <AnimatedText>{`${bottomDescription}`}</AnimatedText>
              </p>
            </div>
          </div>
        </Container>
      ) : null}
    </section>
  )
}

export default HeroDetail
