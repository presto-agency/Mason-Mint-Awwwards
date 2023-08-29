import { FC } from 'react'
import classNames from 'classnames'
import { motion } from 'framer-motion'
import { NavigationLayout } from '@/components/Header/ui/NavigationLayout/NavigationLayout'

import styles from './MobileMenu.module.scss'
import headerStyles from '../Header.module.scss'

type MobileMenuProps = {
  className?: string
}

const headerVariant = {
  animate: { opacity: 1 },
  initial: { opacity: 0 },
  exit: { opacity: 0 },
  transition: {
    ease: 'easeInOut',
    duration: 0.5,
    delay: 0.5,
  },
}

const MobileMenu: FC<MobileMenuProps> = ({ className }) => {
  return (
    <motion.div
      className={classNames(styles['menu'], [className])}
      {...headerVariant}
    >
      <NavigationLayout className={headerStyles['mobile']} isAnimated={true} />
    </motion.div>
  )
}

export default MobileMenu
