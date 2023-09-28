import { FC } from 'react'
import { motion } from 'framer-motion'
import ArrowSelect from '@/ui/Icons/ArrowSelect'
import { Portal } from '@/ui/Portal/Portal'

import styles from './ScrollTopButton.module.scss'

type ScrollTopButtonProps = {
  scrollTop: () => Promise<void>
}

const buttonVariants = {
  hidden: {
    y: 100,
  },
  visible: {
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'anticipate',
    },
  },
}

export const ScrollTopButton: FC<ScrollTopButtonProps> = ({ scrollTop }) => {
  return (
    <Portal>
      <motion.button
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={buttonVariants}
        className={styles['ScrollTopButton']}
        onClick={scrollTop}
      >
        <ArrowSelect className={styles['arrowIcon']} />
      </motion.button>
    </Portal>
  )
}
