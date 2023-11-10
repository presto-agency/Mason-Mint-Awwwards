import { FC } from 'react'
import classNames from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'

import styles from './LogoComponent.module.scss'
import LogoWhite from '@/ui/Logo/ui/LogoWhite/LogoWhite'
import LogoColor from '@/ui/Logo/ui/LogoColor/LogoColor'
import useWindowDimensions from '@/hooks/useWindowDimensions'
import { breakpointDesktop } from '@/utils/variables'

type LogoProps = {
  className?: string
  isWhite?: boolean
  isSmall?: boolean
}
export const LogoComponent: FC<LogoProps> = ({
  className,
  isWhite = true,
  isSmall = false,
}) => {
  const { width } = useWindowDimensions()

  return (
    <div className={classNames(styles['LogoComponent'], className)}>
      <AnimatePresence mode={'wait'}>
        {isWhite ? (
          <motion.div
            key={'white'}
            className={styles['LogoComponent__container']}
            initial={{ opacity: 0, width: 'auto' }}
            animate={{
              opacity: 1,
              width: width >= breakpointDesktop && isSmall ? '100rem' : 'auto',
            }}
            exit={{ opacity: 0, width: 'auto' }}
            transition={{ duration: 0.4 }}
          >
            <LogoWhite />
          </motion.div>
        ) : (
          <motion.div
            key={'dark'}
            className={styles['LogoComponent__container']}
            initial={{ opacity: 0, width: 'auto' }}
            animate={{
              opacity: 1,
              width: width >= breakpointDesktop && isSmall ? '100rem' : 'auto',
            }}
            exit={{ opacity: 0, width: 'auto' }}
            transition={{ duration: 0.4 }}
          >
            <LogoColor isSmall={isSmall} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
