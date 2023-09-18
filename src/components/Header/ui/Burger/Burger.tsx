import { FC, memo } from 'react'
import classNames from 'classnames'
import { motion } from 'framer-motion'

import styles from './Burger.module.scss'

type BurgerProps = {
  opened: boolean
  toggleMenu: () => void
  scrolled: boolean
  theme: 'dark' | 'light'
}

const topLineVariants = {
  open: {
    rotate: 45,
    top: '50%',
    translateY: '-50%',
    transition: {
      top: { duration: 0.1 },
      translateY: { duration: 0.1 },
      rotate: { delay: 0.5, duration: 0.1 },
    },
  },
  closed: {
    rotate: 0,
    top: '0%',
    translateY: '0%',
    transition: {
      top: { delay: 0.5, duration: 0.1 },
      translateY: { duration: 0.1 },
      rotate: { duration: 0.1 },
    },
  },
}

const middleLineVariants = {
  open: {
    rotate: -45,
    transition: {
      rotate: { delay: 0.5, duration: 0.1 },
    },
  },
  closed: {
    rotate: 0,
    translateY: '-50%',
    transition: {
      rotate: { duration: 0.1 },
      translateY: { duration: 0.1 },
    },
  },
}

const bottomLineVariants = {
  open: {
    opacity: 0,
    bottom: '50%',
    translateY: '50%',
    transition: {
      bottom: { duration: 0.1 },
      translateY: { duration: 0.1 },
      opacity: { delay: 0.5, duration: 0 },
    },
  },
  closed: {
    opacity: 1,
    bottom: '0%',
    translateY: '0%',
    transition: {
      opacity: { delay: 0.5, duration: 0 },
      bottom: { delay: 0.5, duration: 0.1 },
      translateY: { delay: 0.5, duration: 0.1 },
    },
  },
}

const Burger: FC<BurgerProps> = ({ opened, scrolled, theme, toggleMenu }) => {
  const mods = {
    [styles.opened]: opened,
    [styles.scrolled]: scrolled,
    [styles[theme]]: true,
  }

  return (
    <motion.div
      className={classNames(styles['burger'], mods)}
      onClick={toggleMenu}
      initial={false}
      animate={opened ? 'open' : 'closed'}
    >
      <motion.span
        className={styles['burger__line']}
        variants={topLineVariants}
      ></motion.span>
      <motion.span
        className={styles['burger__line']}
        variants={middleLineVariants}
      ></motion.span>
      <motion.span
        className={styles['burger__line']}
        variants={bottomLineVariants}
      ></motion.span>
    </motion.div>
  )
}

export default memo(Burger)
