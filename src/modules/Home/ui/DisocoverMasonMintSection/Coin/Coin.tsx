import { FC, useEffect, useMemo, useRef, useState } from 'react'
import { FlipCoinTypes } from '../assets/FlipCoinTypes'
import {
  MotionValue,
  motion,
  useMotionValueEvent,
  useTransform,
} from 'framer-motion'

import Lottie, { LottieRefCurrentProps } from 'lottie-react'
const loaderJsonPromise = import('../assets/flipCoin.json')

import styles from '../DiscoverMasonMintSection.module.scss'

type CoinProps = {
  scrollYProgress: MotionValue<number>
}

const initial = {
  opacity: 0,
  x: '-50%',
  y: '-50%',
}

const transition = {
  duration: 0.3,
  ease: 'easeInOut',
}

export const Coin: FC<CoinProps> = ({ scrollYProgress }) => {
  const refLottie = useRef<LottieRefCurrentProps | null>(null)
  const progress = useTransform(scrollYProgress, [0, 1], [0, 62])

  const [loaderJson, setLoaderJson] = useState<FlipCoinTypes | null>(null)
  const [prevProgress, setPrevProgress] = useState(0)

  useMotionValueEvent(progress, 'change', (latest) => {
    const roundedLatest = Math.round(latest)
    if (roundedLatest !== prevProgress) {
      refLottie.current?.goToAndStop(roundedLatest, true)
      setPrevProgress(roundedLatest)
    }
  })

  useEffect(() => {
    loaderJsonPromise.then((data) => {
      setLoaderJson(data.default as FlipCoinTypes)
    })
  }, [])

  const animate = useMemo(() => {
    return {
      opacity: prevProgress >= 5 && prevProgress <= 50 ? 1 : 0,
      x: '-50%',
      y: prevProgress >= 5 && prevProgress <= 50 ? '-50%' : '0%',
      scaleY: prevProgress >= 5 && prevProgress <= 50 ? 1 : 0.9,
    }
  }, [prevProgress])

  return (
    <motion.div
      initial={initial}
      animate={animate}
      transition={transition}
      className={styles['imageContainer']}
    >
      <Lottie
        animationData={loaderJson}
        lottieRef={refLottie}
        autoplay={false}
      />
    </motion.div>
  )
}
