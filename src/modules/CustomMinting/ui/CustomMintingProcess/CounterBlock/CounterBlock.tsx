import { FC, useMemo } from 'react'
import classNames from 'classnames'
import { AnimatePresence, Transition, Variants, motion } from 'framer-motion'
import { useScrollDirection } from '@/hooks/useScrollDirection'
import { numberWithZero } from '@/utils/number/numberWithZero'

import styles from './CounterBlock.module.scss'

type CounterBlockProps = {
  className?: string
  count: number
  activeSlide: number
}

const getStringArray = (number: number) => {
  if (number > 10) {
    return Array.from(`${number}`)
  } else {
    return Array.from(`0${number}`)
  }
}

const blockVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
}

const transition: Transition = { duration: 0.6, ease: 'easeInOut' }

export const CounterBlock: FC<CounterBlockProps> = ({
  count,
  activeSlide,
  className,
}) => {
  const scrollDirection = useScrollDirection('down')

  const arrayOfNumbers = useMemo(() => {
    return getStringArray(activeSlide)
  }, [activeSlide])

  const counterVariants: Variants = useMemo(() => {
    return {
      initial: {
        y: scrollDirection === 'down' ? -300 : 300,
      },
      animate: {
        y: 0,
      },
      exit: {
        y: scrollDirection === 'down' ? 300 : -300,
      },
    }
  }, [scrollDirection])

  return (
    <div className={classNames(styles['counterBlock'], className)}>
      <motion.div
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={blockVariants}
        transition={transition}
        className={styles['counterBlock_current']}
      >
        <AnimatePresence mode="popLayout">
          {arrayOfNumbers.map((item, index) => {
            return (
              <motion.span
                key={`${item}${index}`}
                initial="initial"
                animate="animate"
                exit="exit"
                variants={counterVariants}
                transition={transition}
              >
                {item}
              </motion.span>
            )
          })}
        </AnimatePresence>
      </motion.div>
      <motion.span
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={blockVariants}
        transition={transition}
        className={styles['counterBlock_sum']}
      >
        /{numberWithZero(count)}
      </motion.span>
    </div>
  )
}
