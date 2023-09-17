import { FC, useMemo } from 'react'
import { motion, MotionValue, useTransform, Variants } from 'framer-motion'
import styles from './MarqueeText.module.scss'
import classNames from 'classnames'

type MarqueeTextProps = {
  className?: string
  text: string
  inputRange?: number[]
  outputRange?: unknown[]
  scrollYProgress: MotionValue<number>
}

const letterVariants: Variants = {
  hidden: {
    opacity: 0.7,
    rotateX: '-90deg',
  },
  visible: {
    opacity: 1,
    rotateX: '0deg',
  },
}
const letterTransition = { duration: 0.3, ease: 'easeInOut' }

const containerTrasnition = {
  staggerChildren: 0.6,
  staggerDirection: -1,
}

export const MarqueeText: FC<MarqueeTextProps> = ({
  className,
  text,
  scrollYProgress,
  inputRange = [0, 1],
  outputRange = ['100%', '-100%'],
}) => {
  const arrayOfText = useMemo(() => Array.from(text), [text])
  const marqueeX = useTransform(scrollYProgress, inputRange, outputRange)

  const style = useMemo(() => {
    return {
      x: marqueeX,
    }
  }, [marqueeX])

  return (
    <motion.div
      className={classNames(styles['marqueeTextContainer'], className)}
      transition={containerTrasnition}
      style={style}
    >
      {arrayOfText.map((item, index) => {
        return (
          <motion.span
            initial="hidden"
            whileInView="visible"
            transition={letterTransition}
            variants={letterVariants}
            key={index}
          >
            {item === ' ' ? <pre>{item}</pre> : item}
          </motion.span>
        )
      })}
    </motion.div>
  )
}
