import { FC, useMemo } from 'react'
import { useScrollDirection } from '@/hooks/useScrollDirection'
import { AnimatePresence, Transition, Variants, motion } from 'framer-motion'
import classNames from 'classnames'

import styles from './DescriptionBlock.module.scss'

type DescriptionBlockProps = {
  className?: string
  data: {
    title: string
    description: string
    thumbs: string[]
  }[]
  activeSlide: number
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

export const DescriptionBlock: FC<DescriptionBlockProps> = ({
  className,
  data,
  activeSlide,
}) => {
  const scrollDirection = useScrollDirection('down')

  const textVariants: Variants = useMemo(() => {
    return {
      initial: {
        y: scrollDirection === 'down' ? -150 : 150,
        opacity: 0,
      },
      animate: {
        y: 0,
        opacity: 1,
      },
      exit: {
        y: scrollDirection === 'down' ? 150 : -150,
        opacity: 0,
      },
    }
  }, [scrollDirection])

  const description = useMemo(
    () => ({
      __html: data[activeSlide - 1].description,
    }),
    [activeSlide, data]
  )

  const title = useMemo(
    () => ({
      __html: data[activeSlide - 1].title,
    }),
    [activeSlide, data]
  )

  return (
    <div className={classNames(styles['descriptionBlock'], className)}>
      <motion.div
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={blockVariants}
        transition={transition}
        className={styles['descriptionBlock_current']}
      >
        <AnimatePresence mode="popLayout">
          <motion.h4
            initial="initial"
            animate="animate"
            exit="exit"
            variants={textVariants}
            transition={transition}
            key={`${activeSlide}h4`}
            dangerouslySetInnerHTML={title}
          />
        </AnimatePresence>
      </motion.div>
      <motion.div
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={blockVariants}
        transition={transition}
        className={styles['descriptionBlock_current']}
      >
        <AnimatePresence mode="popLayout">
          <motion.p
            initial="initial"
            animate="animate"
            exit="exit"
            variants={textVariants}
            transition={transition}
            key={`${activeSlide}p`}
            dangerouslySetInnerHTML={description}
          />
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
