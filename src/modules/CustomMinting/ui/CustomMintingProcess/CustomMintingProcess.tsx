import { FC, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import classNames from 'classnames'
import { AnimatePresence, useMotionValueEvent, useScroll } from 'framer-motion'

import { data } from './data'

import { MarqueeText } from '@/ui/MarqueeText/MarqueeText'
import { CoinBlock } from './CoinBlock/CoinBlock'
import { CounterBlock } from './CounterBlock/CounterBlock'
import { DescriptionBlock } from './DescriptionBlock/DescriptionBlock'

import styles from './CustomMintingProcess.module.scss'

const AnimatedText = dynamic(() => import('@/ui/AnimatedText/AnimatedText'))
const AbstractLogo = dynamic(() => import('@/ui/AbstractLogo/AbstractLogo'), {
  ssr: false,
})

const CustomMintingProcess: FC<{ className?: string }> = ({ className }) => {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [activeSlide, setActiveSlide] = useState(0)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
  })

  useMotionValueEvent(scrollYProgress, 'change', (latestProgress) => {
    if (latestProgress < 0.5) {
      setActiveSlide(0)
      return
    }

    if (latestProgress >= 0.5 && latestProgress < 0.625) {
      setActiveSlide(1)
      return
    }
    if (latestProgress >= 0.625 && latestProgress < 0.75) {
      setActiveSlide(2)
      return
    }
    if (latestProgress >= 0.75 && latestProgress < 0.875) {
      setActiveSlide(3)
      return
    }
    if (latestProgress >= 0.875) {
      setActiveSlide(4)
      return
    }
  })

  return (
    <section
      ref={sectionRef}
      className={classNames(styles['CustomMintingProcess'], className)}
    >
      <AbstractLogo className={styles['abstract']} parallax />
      <div className={styles['hero']}>
        <h6>
          <AnimatedText>our minting process</AnimatedText>
        </h6>
        <h1>
          <AnimatedText title withBlueDot>
            Let Us Make Your Vision a Reality
          </AnimatedText>
        </h1>
      </div>
      <div className={styles['stickyContainer']}>
        <MarqueeText
          className={styles['marqueeBlock']}
          text="our minting process."
          inputRange={[0.05, 0.5]}
          scrollYProgress={scrollYProgress}
          outputRange={['100%', '-100%']}
        />

        <div className={styles['contentBlock']}>
          <div className={styles['description']}>
            <AnimatePresence>
              {activeSlide && (
                <DescriptionBlock data={data} activeSlide={activeSlide} />
              )}
            </AnimatePresence>
          </div>
          <div className={styles['coin']}>
            <CoinBlock data={data} scrollYProgress={scrollYProgress} />
          </div>
          <div className={styles['counter']}>
            <AnimatePresence>
              {activeSlide && (
                <CounterBlock activeSlide={activeSlide} count={data.length} />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CustomMintingProcess
