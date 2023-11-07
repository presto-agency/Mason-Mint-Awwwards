import { FC, useMemo } from 'react'
import Image from 'next/image'
import { MotionValue, useTransform, motion, Transition } from 'framer-motion'
import classNames from 'classnames'
import useWindowDimensions from '@/hooks/useWindowDimensions'
import styles from './CoinBlock.module.scss'
import { breakpointMob, breakpointTablet } from '@/utils/variables'

type CoinBlockProps = {
  className?: string
  data: {
    title: string
    description: string
    thumbs: string[]
  }[]
  scrollYProgress: MotionValue<number>
}

const transition: Transition = { duration: 0.6, ease: 'anticipate' }

export const CoinBlock: FC<CoinBlockProps> = ({
  data,
  scrollYProgress,
  className,
}) => {
  const { width } = useWindowDimensions()
  const height2 = useTransform(scrollYProgress, [0.6, 0.6875], ['0%', '100%'])
  const height3 = useTransform(
    scrollYProgress,
    [0.6875, 0.8125],
    ['0%', '100%']
  )
  const height4 = useTransform(
    scrollYProgress,
    [0.8125, 0.9375],
    ['0%', '100%']
  )

  const photoSizeDesktop = useTransform(
    scrollYProgress,
    [0, 0.05],
    ['500rem', '416rem']
  )

  const photoSizeTablet = useTransform(
    scrollYProgress,
    [0, 0.05],
    ['600rem', '500rem']
  )

  const photoSizeMobile = useTransform(
    scrollYProgress,
    [0, 0.05],
    ['300rem', '248rem']
  )

  const photoBlockStyle = useMemo(() => {
    let photoSize: MotionValue<string> | null = photoSizeDesktop

    if (width > breakpointTablet) {
      photoSize = photoSizeDesktop
    }

    if (width > breakpointMob && width <= breakpointTablet) {
      photoSize = photoSizeTablet
    }

    if (width <= breakpointMob) {
      photoSize = photoSizeMobile
    }

    return { width: photoSize, height: photoSize }
  }, [width, photoSizeDesktop, photoSizeMobile, photoSizeTablet])

  return (
    <motion.div
      transition={transition}
      style={photoBlockStyle}
      className={classNames(styles['coinBlock'], className)}
    >
      <motion.div className={styles['coin']}>
        <motion.div style={photoBlockStyle} className={styles['coin__photo']}>
          <Image src={data[0].thumbs[0]} alt={data[0].title} fill />
        </motion.div>
      </motion.div>
      <motion.div style={{ height: height2 }} className={styles['coin']}>
        <motion.div style={photoBlockStyle} className={styles['coin__photo']}>
          <Image src={data[1].thumbs[0]} alt={data[1].title} fill />
        </motion.div>
      </motion.div>
      <motion.div style={{ height: height3 }} className={styles['coin']}>
        <motion.div style={photoBlockStyle} className={styles['coin__photo']}>
          <Image src={data[2].thumbs[0]} alt={data[2].title} fill />
        </motion.div>
      </motion.div>
      <motion.div style={{ height: height4 }} className={styles['coin']}>
        <motion.div style={photoBlockStyle} className={styles['coin__photo']}>
          <Image src={data[3].thumbs[1]} alt={data[3].title} fill />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
