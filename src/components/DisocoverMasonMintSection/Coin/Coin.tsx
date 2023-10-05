import { FC, useEffect, useRef, useState } from 'react'
import { FlipCoinTypes } from '../assets/FlipCoinTypes'
import { MotionValue, useMotionValueEvent, useTransform } from 'framer-motion'

import Lottie, { LottieRefCurrentProps } from 'lottie-react'
const loaderJsonPromise = import('../assets/flipCoin.json')

import styles from '../DiscoverMasonMintSection.module.scss'
import { useWindowSize } from 'usehooks-ts'

type CoinProps = {
  scrollYProgress: MotionValue<number>
}

export const Coin: FC<CoinProps> = ({ scrollYProgress }) => {
  const refLottie = useRef<LottieRefCurrentProps | null>(null)
  const progress = useTransform(scrollYProgress, [0, 1], [0, 61])
  const { width } = useWindowSize()

  const [loaderJson, setLoaderJson] = useState<FlipCoinTypes | null>(null)
  const [prevProgress, setPrevProgress] = useState(0)

  useMotionValueEvent(progress, 'change', (latest) => {
    const roundedLatest = Math.round(latest)

    if (width < 767) {
      if (roundedLatest === 0 && prevProgress > 50) return
    }

    if (roundedLatest === 0 && prevProgress > 58) {
      return
    }

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

  return (
    <div className={styles['imageContainer']}>
      <Lottie
        className={styles['lottie']}
        animationData={loaderJson}
        lottieRef={refLottie}
        autoplay={false}
      />
    </div>
  )
}
