import {
  FC,
  useCallback,
  useEffect,
  useState,
  memo,
  useContext,
  useMemo,
} from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import classNames from 'classnames'
import { motion } from 'framer-motion'

import useWindowDimensions from '@/hooks/useWindowDimensions'
import { useScroll } from '@/hooks/useScroll'

import Container from '@/app/layouts/Container'
import NavigationLayout from '@/components/Header/ui/NavigationLayout/NavigationLayout'
import LogoTest from '@/ui/Logo/LogoTest'
import { MobileLayout } from './MobileLayout/MobileLayout'

import { Store } from '@/utils/Store'
import styles from './Header.module.scss'
import { breakpointTablet } from '@/utils/variables'

type HeaderProps = {
  theme: 'dark' | 'light'
}

const inititalHeader = {
  y: '-100%',
}

const transition = {
  duration: 0.7,
  ease: 'easeInOut',
}

const Header: FC<HeaderProps> = ({ theme: initialTheme }) => {
  const { scrolled, scrollDirection } = useScroll()
  const [scrolledClassToAdd, setScrolledClassToAdd] = useState(false)

  const [menuOpened, setMenuOpened] = useState(false)
  const [menuOpenedClass, setMenuOpenedClass] = useState(false)

  const [headerTheme, setHeaderTheme] = useState(initialTheme)
  const { width } = useWindowDimensions()
  const router = useRouter()
  const store = useContext(Store)

  const mods = {
    [styles[headerTheme]]: true,
    [styles.scrolled]: scrolledClassToAdd,
    [styles.opened]: menuOpenedClass,
  }

  const toggleMenu = useCallback(() => {
    setMenuOpened((prev) => !prev)
  }, [])

  useEffect(() => {
    if (menuOpened) {
      setMenuOpenedClass(true)
      const setOverflowHidden = setTimeout(() => {
        document.body.style.overflow = 'hidden'
      }, 1000)
      return () => clearInterval(setOverflowHidden)
    } else {
      setMenuOpenedClass(false)
      document.body.style.overflow = 'auto'
    }
  }, [menuOpened])

  const handleScroll = useCallback(() => {
    if (menuOpened) {
      return
    }

    if (window.scrollY < 10) {
      setScrolledClassToAdd(false)
      setHeaderTheme(initialTheme)
    }
  }, [menuOpened, initialTheme])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  useEffect(() => {
    if (menuOpenedClass && !scrolled) {
      setHeaderTheme('dark')
    }

    if (!menuOpenedClass && !scrolled) {
      setHeaderTheme(initialTheme)
    }

    if (menuOpenedClass && scrolled) {
      setHeaderTheme('dark')
    }

    if (!menuOpenedClass && scrolled && width <= breakpointTablet) {
      setHeaderTheme('light')
      setScrolledClassToAdd(true)
    }
  }, [menuOpenedClass, initialTheme, scrolled])

  useEffect(() => {
    if (width > breakpointTablet) setMenuOpened(false)
  }, [width])

  useEffect(() => {
    const handleRouteChange = () => {
      setMenuOpened(false)
    }

    router.events.on('routeChangeStart', handleRouteChange)

    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [router])

  const headerAnimation = useMemo(() => {
    return {
      y:
        scrollDirection === 'down' || store?.state.isFirstLoading ? '-100%' : 0,
    }
  }, [scrollDirection, store?.state.isFirstLoading])

  const handleHeaderAnimationComplete = useCallback(() => {
    if (scrolled && scrollDirection === 'down' && width > breakpointTablet) {
      setScrolledClassToAdd(true)
      setHeaderTheme('light')
      return
    }
  }, [scrollDirection, scrolled, width])

  const handleLogoClick = useCallback(() => {
    if (router.pathname !== '/') {
      setHeaderTheme('light')
      setScrolledClassToAdd(false)
    }
  }, [router.pathname])

  return (
    <>
      <motion.header
        className={classNames(styles['header'], mods)}
        initial={inititalHeader}
        animate={headerAnimation}
        transition={transition}
        onAnimationComplete={handleHeaderAnimationComplete}
      >
        <Container className={styles['header__container']}>
          <div className={styles['header__content']}>
            <Link
              scroll={false}
              className={styles['header__content_link']}
              href={'/'}
              onClick={handleLogoClick}
            >
              <div className={styles['logo']}>
                <LogoTest
                  className={styles['logo__icon']}
                  isWhite={headerTheme !== 'light'}
                  withoutText={scrolledClassToAdd && !menuOpened}
                />
              </div>
            </Link>
            <NavigationLayout />
          </div>
        </Container>
        <MobileLayout
          scrolled={scrolled}
          theme={headerTheme}
          menuOpened={menuOpened}
          menuOpenedClass={menuOpenedClass}
          toggleMenu={toggleMenu}
        />
      </motion.header>
    </>
  )
}

export default memo(Header)
