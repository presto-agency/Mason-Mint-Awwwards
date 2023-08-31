import { FC, useCallback, useEffect, useState, memo, useContext } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import classNames from 'classnames'
import { motion } from 'framer-motion'

import useWindowDimensions from '@/hooks/useWindowDimensions'
import { useScroll } from '@/hooks/useScroll'

import Container from '@/app/layouts/Container'
import { NavigationLayout } from '@/components/Header/ui/NavigationLayout/NavigationLayout'
import { LogoTest } from '@/ui/Logo/LogoTest'
import { MobileLayout } from './MobileLayout/MobileLayout'

import { Store } from '@/utils/Store'
import styles from './Header.module.scss'

type HeaderProps = {
  theme: 'dark' | 'light'
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

  const toggleMenu = () => {
    setMenuOpened((prev) => !prev)
  }

  useEffect(() => {
    if (menuOpened) {
      setMenuOpenedClass(true)
    } else {
      const removeOpenedClass = setTimeout(() => {
        setMenuOpenedClass(false)
      }, 1000)
      return () => clearInterval(removeOpenedClass)
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

    if (!menuOpenedClass && scrolled && width <= 991) {
      setHeaderTheme('light')
      setScrolledClassToAdd(true)
    }
  }, [menuOpenedClass, initialTheme, scrolled])

  useEffect(() => {
    if (width > 991) setMenuOpened(false)
  }, [width])

  useEffect(() => {
    document.body.style.overflow = menuOpened ? 'hidden' : 'auto'
  }, [menuOpened])

  useEffect(() => {
    const handleRouteChange = () => {
      setMenuOpened(false)
    }

    router.events.on('routeChangeStart', handleRouteChange)

    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [router])

  return (
    <>
      <motion.header
        className={classNames(styles['header'], mods)}
        initial={{ y: '-100%' }}
        animate={{
          y:
            scrollDirection === 'down' || store?.state.isFirstLoading
              ? '-100%'
              : 0,
        }}
        transition={{ duration: 1, ease: 'easeInOut' }}
        onAnimationComplete={() => {
          if (scrolled && scrollDirection === 'down' && width > 991) {
            setScrolledClassToAdd(true)
            setHeaderTheme('light')
            return
          }
        }}
      >
        <Container className={styles['header__container']}>
          <div className={styles['header__content']}>
            <Link
              scroll={false}
              className={styles['header__content_link']}
              href={'/'}
              onClick={() => {
                if (router.pathname !== '/') {
                  setHeaderTheme('light')
                  setScrolledClassToAdd(false)
                }
              }}
            >
              <div className={styles['logo']}>
                <LogoTest
                  className={styles['logo__icon']}
                  isWhite={headerTheme !== 'light'}
                  withoutText={scrolledClassToAdd && width > 991}
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
