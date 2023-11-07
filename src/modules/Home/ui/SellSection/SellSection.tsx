import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import classNames from 'classnames'
import { useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import Lottie, { LottieRefCurrentProps } from 'lottie-react'

import Container from '@/app/layouts/Container'
import { FlipCoinTypes } from '@/modules/Home/ui/SellSection/assets/FlipCoinTypes'
import { BackgroundImage } from '@/ui/BackgroundImage/BackgroundImage'
import AnimatedText from '@/ui/AnimatedText/AnimatedText'
import AnimatedElement from '@/ui/AnimatedElement/AnimatedElement'
import { ButtonPrimary } from '@/ui/ButtonPrimary/ButtonPrimary'

import useWindowDimensions from '@/hooks/useWindowDimensions'
import routes from '@/utils/routes'

import styles from './SellSection.module.scss'
import { breakpointMob } from '@/utils/variables'

const loaderJsonPromise = import('./assets/flipCoin.json')

const SellSection = () => {
  const refLottie = useRef<LottieRefCurrentProps | null>(null)
  const ref = useRef(null)
  const [isClient, setIsClient] = useState(false)
  const [prevProgress, setPrevProgress] = useState(0)
  const [loaderJson, setLoaderJson] = useState<FlipCoinTypes | null>(null)

  const { width } = useWindowDimensions()
  const { scrollYProgress } = useScroll({ target: ref })
  const progress = useTransform(scrollYProgress, [0, 1], [0, 61])
  useMotionValueEvent(progress, 'change', (latest) => {
    const roundedLatest = Math.round(latest)
    if (roundedLatest !== prevProgress) {
      refLottie.current?.goToAndStop(roundedLatest, true)
      setPrevProgress(roundedLatest)
    }
  })
  useEffect(() => {
    loaderJsonPromise.then((data) => {
      setIsClient(true)
      setLoaderJson(data.default as FlipCoinTypes)
    })
  }, [])

  return (
    <section ref={ref} className={styles['sellSection']}>
      <Container>
        <div className={styles['sellSection__content']}>
          {isClient && width > breakpointMob ? (
            <div className={styles['sellSection__content_left']}>
              <div className={styles['imageWrapper']}>
                <Lottie
                  className={styles['imageContainer']}
                  animationData={loaderJson}
                  lottieRef={refLottie}
                  autoplay={false}
                />
              </div>
            </div>
          ) : null}
          <ul className={styles['sellSection__content_right']}>
            <li className={styles['sectionWrapper']}>
              <div className={styles['sectionContent']}>
                <BackgroundImage
                  src="/images/home/front_coin_1.png"
                  className={styles['image']}
                  quality={100}
                  alt="Coin photo"
                />
                <h6 className={classNames('h6', styles['subtitle'])}>
                  <AnimatedText title>wholesale & distribution</AnimatedText>
                </h6>
                <h2 className={classNames('h3', styles['title'])}>
                  <AnimatedText title>Sell Our Products.</AnimatedText>
                </h2>
                <p className={styles['description']}>
                  <AnimatedText>
                    We work exclusively with precious metal dealers both
                    domestic and abroad to distribute our products. If you are
                    interested in becoming an authorized distributor please fill
                    the contact form.
                  </AnimatedText>
                </p>
                <AnimatedElement delay={0.2}>
                  <Link scroll={false} href={routes.public.becomeDistributor}>
                    <ButtonPrimary
                      variant={'noStroked'}
                      className={styles['button']}
                    >
                      Become a Distributor
                    </ButtonPrimary>
                  </Link>
                </AnimatedElement>
              </div>
            </li>
            <li className={styles['sectionWrapper']}>
              <div className={styles['sectionContent']}>
                <BackgroundImage
                  src="/images/home/back_coin_1.png"
                  className={styles['image']}
                  quality={100}
                  alt="Coin photo"
                />
                <h6 className={classNames('h6', styles['subtitle'])}>
                  <AnimatedText title>iso 9001:2015</AnimatedText>
                </h6>
                <h2 className={classNames('h3', styles['title'])}>
                  <AnimatedText title>We Are Certified.</AnimatedText>
                </h2>
                <p className={styles['description']}>
                  <AnimatedText>
                    Mason Mint is an ISO 9001:2015 compliant facility which
                    requires us to meet rigorous international standards.
                  </AnimatedText>
                </p>
                <AnimatedElement delay={0.2}>
                  <a href="mm-iso9001-2015.pdf" target="_blank">
                    <ButtonPrimary
                      variant={'noStroked'}
                      className={styles['button']}
                    >
                      View certificate
                    </ButtonPrimary>
                  </a>
                </AnimatedElement>
              </div>
            </li>
          </ul>
        </div>
      </Container>
    </section>
  )
}

export default SellSection
