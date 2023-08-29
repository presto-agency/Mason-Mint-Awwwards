import { FC } from 'react'
import classNames from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import LogoWhite from '../../../public/icons/logo.svg'
import LogoColor from '../../../public/icons/logo-color.svg'

import styles from './Logo.module.scss'

type LogoProps = {
  className?: string
  isWhite?: boolean
}

export const Logo: FC<LogoProps> = ({ className, isWhite = true }) => {
  return (
    <div className={classNames(styles.Logo, className)}>
      {isWhite ? (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <LogoWhite />
          </motion.div>
        </AnimatePresence>
      ) : (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <LogoColor />
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  )
}
