import { FC, memo } from 'react'
import dynamic from 'next/dynamic'
import { Burger } from '../Burger/Burger'
import { AnimatePresence } from 'framer-motion'

const MobileMenu = dynamic(() => import('../MobileMenu/MobileMenu'))

import styles from '../Header.module.scss'

type MobileLayoutProps = {
  scrolled: boolean
  theme: 'dark' | 'light'
  menuOpened: boolean
  toggleMenu: () => void
}

export const MobileLayout: FC<MobileLayoutProps> = memo(
  ({ menuOpened, scrolled, theme, toggleMenu }) => {
    return (
      <div className={styles['header__content_mobile']}>
        <Burger
          scrolled={scrolled}
          theme={theme}
          opened={menuOpened}
          toggleMenu={toggleMenu}
        />
        <AnimatePresence>{menuOpened && <MobileMenu />}</AnimatePresence>
      </div>
    )
  }
)
