import {
  Dispatch,
  FC,
  Fragment,
  ReactNode,
  SetStateAction,
  useState,
} from 'react'
import classNames from 'classnames'
import Link from 'next/link'
import type SwiperCore from 'swiper'
import { SwiperSlide, Swiper, useSwiper } from 'swiper/react'
import { Controller, EffectCreative } from 'swiper/modules'
import { ButtonPrimary } from '@/ui/ButtonPrimary/ButtonPrimary'
import AnimatedText from '@/ui/AnimatedText/AnimatedText'
import Container from '@/app/layouts/Container'
import { BackgroundImage } from '@/ui/BackgroundImage/BackgroundImage'
import { AnimatePresence, motion } from 'framer-motion'
import useWindowDimensions from '@/hooks/useWindowDimensions'
import SliderArrow from '@/ui/SliderArrow/SliderArrow'
import { data } from '@/modules/Home/ui/ExploreDesignsSection/data'
import AnimatedElement from '@/ui/AnimatedElement/AnimatedElement'
import ParallaxSection from '@/ui/ParallaxSection/ParallaxSection'
import routes from '@/utils/routes'

import 'swiper/css'
import styles from './ExploreDesignsSection.module.scss'

type SwiperButtonProps = {
  children?: ReactNode
  setRevertAnimation: Dispatch<SetStateAction<boolean>>
  setIsFirstSlide: Dispatch<SetStateAction<boolean>>
  setIsLastSlide: Dispatch<SetStateAction<boolean>>
  isFirstSlide?: boolean
  isLastSlide?: boolean
}
type SlideInner = {
  title: string
  subtitle: string
}

const SwiperButtonNext: FC<SwiperButtonProps> = ({
  setRevertAnimation,
  setIsLastSlide,
  setIsFirstSlide,
  isLastSlide,
}) => {
  const swiper = useSwiper()

  const handleClick = () => {
    if (swiper) {
      setRevertAnimation(true)
      setTimeout(() => {
        swiper.slideNext()
        setIsLastSlide(swiper.isEnd)
        setIsFirstSlide(swiper.isBeginning)
      }, 100)
    }
  }

  return (
    <div
      className={classNames(styles['arrowDesign'], styles['arrowDesign__next'])}
      onClick={handleClick}
    >
      <SliderArrow disabled={isLastSlide} />
    </div>
  )
}

const SwiperButtonPrev: FC<SwiperButtonProps> = ({
  setRevertAnimation,
  setIsLastSlide,
  setIsFirstSlide,
  isFirstSlide,
}) => {
  const swiper = useSwiper()

  const handleClick = () => {
    if (swiper) {
      setRevertAnimation(false)
      setTimeout(() => {
        swiper.slidePrev()
        setIsLastSlide(swiper.isEnd)
        setIsFirstSlide(swiper.isBeginning)
      }, 100)
    }
  }

  return (
    <div
      className={classNames(styles['arrowDesign'], styles['arrowDesign__prev'])}
      onClick={handleClick}
    >
      <SliderArrow disabled={isFirstSlide} type="prev" />
    </div>
  )
}

const SlideInner: FC<SlideInner> = ({ title, subtitle }) => {
  return (
    <>
      <h4 className={classNames('h4', styles['textSwiper__title'])}>
        <AnimatedText>{title}</AnimatedText>
      </h4>
      <p className={styles['textSwiper__description']}>
        <AnimatedText>{subtitle}</AnimatedText>
      </p>
      <AnimatedElement delay={0}>
        <Link scroll={false} href={routes.public.designs}>
          <ButtonPrimary variant="noStroked">View catalog</ButtonPrimary>
        </Link>
      </AnimatedElement>
    </>
  )
}

const ExploreDesignsSection = () => {
  const [controlledSwiper, setControlledSwiper] = useState<SwiperCore | null>(
    null
  )
  const [revertAnimation, setRevertAnimation] = useState(true)
  const [isFirstSlide, setIsFirstSlide] = useState(true)
  const [isLastSlide, setIsLastSlide] = useState(false)
  const { width } = useWindowDimensions()

  const motionPropsText = {
    initial: revertAnimation
      ? { opacity: 0, y: '-20rem' }
      : { opacity: 0, y: '20rem' },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, delay: 0.4, ease: [0.55, 0.61, 0, 1.04] },
    },
    exit: revertAnimation
      ? {
          opacity: 0,
          transition: { duration: 1, ease: [0.55, 0.61, 0, 1.04] },
          y: '20rem',
          delay: 0.1,
        }
      : {
          opacity: 0,
          transition: { duration: 1, ease: [0.55, 0.61, 0, 1.04] },
          y: '-20rem',
          delay: 0.1,
        },
    transition: { duration: 1, ease: [0.55, 0.61, 0, 1.04] },
  }

  const motionProps = {
    initial: revertAnimation
      ? { rotate: -75, x: -200, opacity: 0 }
      : { rotate: 75, x: 200, opacity: 0 },
    animate: { rotate: 0, x: 0, opacity: 1 },
    exit: revertAnimation
      ? { rotate: 75, x: 200, opacity: 0 }
      : { rotate: -75, x: -200, opacity: 0 },
    transition: { duration: 1, delay: 0.1 },
  }

  const motionPropsForBackCoin = {
    ...motionProps,
    transition: { ...motionProps.transition, delay: 0 },
  }

  return (
    <section className={styles['ExploreDesignsSection']}>
      <ParallaxSection className={styles['ExploreDesignsSection__abstract']} />
      <Container>
        <div className={styles['ExploreDesignsSection__content']}>
          <div className={styles['ExploreDesignsSection__content_description']}>
            <h2 className={classNames('h2', styles['title'])}>
              <AnimatedText title withBlueDot>
                Explore Our Designs
              </AnimatedText>
            </h2>
            {width > 767 ? (
              <>
                <Swiper
                  style={{ overflow: 'visible' }}
                  className={styles['sliderText']}
                  modules={[Controller, EffectCreative]}
                  onSwiper={setControlledSwiper}
                  effect={'creative'}
                  virtualTranslate={true}
                  creativeEffect={{
                    prev: {
                      translate: [0, 0, 0],
                    },
                    next: {
                      translate: [0, 0, 0],
                    },
                  }}
                  slidesPerView={1}
                  allowTouchMove={false}
                >
                  {data.map((slide) => (
                    <SwiperSlide key={slide.id}>
                      {({ isActive }) => (
                        <AnimatePresence>
                          {isActive && (
                            <motion.div {...motionPropsText}>
                              <SlideInner
                                title={slide.title}
                                subtitle={slide.subtitle}
                              />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      )}
                    </SwiperSlide>
                  ))}
                </Swiper>
              </>
            ) : null}
          </div>
          <div className={styles['ExploreDesignsSection__content_sliderCoin']}>
            <Swiper
              style={{ overflow: 'visible' }}
              className={styles['sliderCoin']}
              modules={[Controller, EffectCreative]}
              speed={1000}
              effect={'creative'}
              virtualTranslate={true}
              creativeEffect={{
                prev: {
                  translate: [0, 0, 0],
                },
                next: {
                  translate: [0, 0, 0],
                },
              }}
              allowTouchMove={false}
              controller={{ control: controlledSwiper }}
              slidesPerView={1}
            >
              {data.map((slide) => (
                <SwiperSlide
                  className={styles['sliderCoin__slide']}
                  key={slide.id}
                >
                  {({ isActive }) => (
                    <AnimatePresence>
                      {isActive && (
                        <Fragment key={slide.id}>
                          <div className={styles['coinsContainer']}>
                            <motion.div
                              className={
                                styles['sliderCoin__slide_containerBack']
                              }
                              {...motionPropsForBackCoin}
                            >
                              <BackgroundImage
                                className={styles['coinBack']}
                                src={slide.url.back}
                                alt="coin back"
                              />
                            </motion.div>
                            <motion.div
                              className={
                                styles['sliderCoin__slide_containerFront']
                              }
                              {...motionProps}
                            >
                              <BackgroundImage
                                className={styles['coinFront']}
                                src={slide.url.front}
                                alt="coin front"
                              />
                            </motion.div>
                          </div>
                          {width <= 767 ? (
                            <motion.div {...motionPropsText}>
                              <SlideInner
                                title={slide.title}
                                subtitle={slide.subtitle}
                              />
                            </motion.div>
                          ) : null}
                        </Fragment>
                      )}
                    </AnimatePresence>
                  )}
                </SwiperSlide>
              ))}
              <SwiperButtonPrev
                setRevertAnimation={setRevertAnimation}
                setIsFirstSlide={setIsFirstSlide}
                setIsLastSlide={setIsLastSlide}
                isFirstSlide={isFirstSlide}
              />
              <SwiperButtonNext
                setRevertAnimation={setRevertAnimation}
                setIsFirstSlide={setIsFirstSlide}
                setIsLastSlide={setIsLastSlide}
                isLastSlide={isLastSlide}
              />
            </Swiper>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default ExploreDesignsSection
