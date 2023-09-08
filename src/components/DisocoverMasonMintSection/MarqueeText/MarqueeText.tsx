import { FC, useMemo } from 'react'
import { motion, MotionValue, useTransform, Variants } from 'framer-motion'
import styles from '../DiscoverMasonMintSection.module.scss'

type MarqueeTextProps = {
  text: string
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
  text,
  scrollYProgress,
}) => {
  const arrayOfText = useMemo(() => Array.from(text), [text])
  const marqueeX = useTransform(scrollYProgress, [0, 1], ['75%', '-100%'])

  const style = useMemo(() => {
    return {
      x: marqueeX,
    }
  }, [marqueeX])

  return (
    <motion.div
      className={styles['marqueeTextContainer']}
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
