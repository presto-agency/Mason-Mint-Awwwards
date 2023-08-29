import { FC, useRef, useEffect, useState, Fragment } from 'react'
import classNames from 'classnames'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { useScrollDirection } from '@/hooks/useScrollDirection'
import Container from '@/app/layouts/Container'
import useWindowDimensions from '@/hooks/useWindowDimensions'
import AnimatedText from '@/ui/AnimatedText/AnimatedText'
import AnimatedElement from '@/ui/AnimatedElement/AnimatedElement'
import AbstractLogo from '@/ui/AbstractLogo/AbstractLogo'
import { numberWithZero } from '@/utils/number/numberWithZero'
import ParallaxSection from '@/ui/ParallaxSection/ParallaxSection'
import { data } from './data'

import styles from './CustomMintingProcess.module.scss'

const CustomMintingProcess: FC<{ className?: string }> = ({ className }) => {
  const targetRef = useRef<HTMLDivElement | null>(null)
  const [activeSlide, setActiveSlide] = useState<number>(1)
  const scrollDirection = useScrollDirection()
  const { width } = useWindowDimensions()

  const handleScroll = () => {
    const slides = document.querySelectorAll('[data-target="slide"]')
    const wHeight = window.innerHeight
    for (let i = 0; i < slides.length; i++) {
      const y = slides[i].getBoundingClientRect().y
      if (y <= 0) {
        const absY = Math.abs(y as number)
        if (absY < wHeight) {
          const value = Math.min(wHeight, absY)
          const progress = Math.floor((value / wHeight) * 105)

          const currentSmallSlide = document.querySelector(
            `[data-trigger="slide-small"]:nth-child(${i + 2})`
          ) as HTMLElement | null
          const currentBigSlide = document.querySelector(
            `[data-trigger="slide-big"]:nth-child(${i + 2})`
          ) as HTMLElement | null

          if (currentSmallSlide) {
            currentSmallSlide.style.height = `${progress}%`
          }
          if (currentBigSlide) {
            currentBigSlide.style.height = `${progress}%`
          }

          setActiveSlide(i + 1)
        }
      }
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const motionPropsText = {
    initial: {
      opacity: 0,
      y: scrollDirection === 'down' ? -20 : 20,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: [0.55, 0.61, 0, 1.04],
      },
    },
    exit: {
      opacity: 0,
      y: scrollDirection === 'down' ? 20 : -20,
      transition: {
        duration: 0.5,
        ease: [0.55, 0.61, 0, 1.04],
      },
    },
  }

  return (
    <div ref={targetRef} className={classNames(styles['process'], className)}>
      <div className={styles['process__mask']}>
        <ParallaxSection>
          <AbstractLogo className={styles['process__abstract']} />
        </ParallaxSection>
      </div>
      <div className={styles['process__body']}>
        <Container>
          <h2 className={classNames(styles['process__title'], 'h2')}>
            <AnimatedText title withBlueDot>
              Our Minting Process
            </AnimatedText>
          </h2>
          {width > 767 ? (
            <div className="row">
              <div className="col-md-7">
                <div className={styles['process__overlay']}>
                  <div className={styles['process__photos']}>
                    <div
                      className={classNames(
                        styles['process__photos_item'],
                        styles['__1']
                      )}
                    >
                      {data.map((item, index) => (
                        <div
                          key={index}
                          className={styles['process__photos_mask']}
                          data-trigger="slide-small"
                        >
                          <div className={styles['process__photos_mask_item']}>
                            <Image src={item.thumbs[0]} alt={item.title} fill />
                          </div>
                        </div>
                      ))}
                    </div>
                    <div
                      className={classNames(
                        styles['process__photos_item'],
                        styles['__2']
                      )}
                    >
                      {data.map((item, index) => (
                        <div
                          key={index}
                          className={styles['process__photos_mask']}
                          data-trigger="slide-big"
                        >
                          <div className={styles['process__photos_mask_item']}>
                            <Image src={item.thumbs[1]} alt={item.title} fill />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 offset-md-1">
                <div className={styles['process__content']}>
                  <div
                    className={classNames(styles['process__navigation'], 'h4')}
                  >
                    <span className={styles['process__navigation_current']}>
                      {data.map((item, index) => (
                        <Fragment key={index}>
                          {activeSlide === index + 1 ? (
                            <motion.span {...motionPropsText}>
                              {numberWithZero(index + 1)}
                            </motion.span>
                          ) : null}
                        </Fragment>
                      ))}
                    </span>
                    /<span>{numberWithZero(data.length)}</span>
                  </div>
                  <div className={styles['process__description']}>
                    {data.map((item, index) => (
                      <Fragment key={index}>
                        <AnimatePresence>
                          {activeSlide === index + 1 ? (
                            <motion.div
                              {...motionPropsText}
                              className={styles['process__description_box']}
                            >
                              <p
                                className={classNames(
                                  styles['process__description_title'],
                                  'h4'
                                )}
                              >
                                {item.title}
                              </p>
                              <div
                                className={classNames(
                                  styles['process__description_item']
                                )}
                                dangerouslySetInnerHTML={{
                                  __html: item.description,
                                }}
                              />
                            </motion.div>
                          ) : null}
                        </AnimatePresence>
                      </Fragment>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            data.map((item, index) => (
              <div key={index} className={styles['process__box']}>
                <AnimatedElement delay={0}>
                  <div
                    className={classNames(styles['process__navigation'], 'h4')}
                  >
                    <span className={styles['process__navigation_current']}>
                      {numberWithZero(index + 1)}
                    </span>
                    /<span>{numberWithZero(data.length)}</span>
                  </div>
                </AnimatedElement>
                <AnimatedElement delay={0}>
                  <div className={styles['process__photos']}>
                    <div
                      className={classNames(
                        styles['process__photos_item'],
                        styles['__1']
                      )}
                    >
                      <Image src={item.thumbs[0]} alt={item.title} fill />
                    </div>
                    <div
                      className={classNames(
                        styles['process__photos_item'],
                        styles['__2']
                      )}
                    >
                      <Image src={item.thumbs[1]} alt={item.title} fill />
                    </div>
                  </div>
                </AnimatedElement>
                <div className={styles['process__description']}>
                  <p
                    className={classNames(
                      styles['process__description_title'],
                      'h4'
                    )}
                  >
                    <AnimatedText title>{`${item.title}`}</AnimatedText>
                  </p>
                  <AnimatedElement delay={0}>
                    <div
                      className={classNames(
                        styles['process__description_item']
                      )}
                      dangerouslySetInnerHTML={{
                        __html: item.description,
                      }}
                    />
                  </AnimatedElement>
                </div>
              </div>
            ))
          )}
        </Container>
      </div>
      <div className={styles['process__slides']}>
        {data.map(({}, index) => (
          <div
            key={index}
            data-target="slide"
            className={styles['process__slides_item']}
          />
        ))}
      </div>
    </div>
  )
}

export default CustomMintingProcess
