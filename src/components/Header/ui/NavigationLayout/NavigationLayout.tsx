import { FC, memo, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import classNames from 'classnames'
import { motion } from 'framer-motion'
import AnimatedTextCharacter from '@/components/Header/ui/NavigationLayout/AnimatedTextCharacter'
import routes from '@/utils/routes'
import { ButtonPrimary } from '@/ui/ButtonPrimary/ButtonPrimary'

import styles from '../Header.module.scss'
import { useRouter } from 'next/router'

type MobileMenuProps = {
  className?: string
  isAnimated?: boolean
}

const buttonVariant = {
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 1,
      type: 'spring',
      damping: 12,
      stiffness: 100,
    },
  },
  hidden: {
    opacity: 0,
    y: 3,
    transition: {
      type: 'spring',
      damping: 12,
      stiffness: 100,
    },
  },
}

// const headerVariant = {
//   animate: { height: '100%' },
//   initial: { height: '0%' },
//   exit: { height: '0%' },
//   transition: {
//     ease: 'easeInOut',
//     duration: 0.5,
//     delay: 0.5,
//   },
// }

const navigationHeaderLinks = [
  {
    href: routes.public.about,
    description: 'About Us',
  },
  {
    href: routes.public.customMinting,
    description: 'Custom Minting',
  },
  {
    href: routes.public.designs,
    description: 'Designs',
  },
  {
    href: routes.public.packaging,
    description: 'Packaging',
  },
  {
    href: routes.public.contactUs,
    description: 'Contact Us',
  },
]

const button = (
  <ButtonPrimary
    variant="blue"
    arrows={false}
    size={'small'}
    href={routes.public.becomeDistributor}
  >
    Become A Distributor
  </ButtonPrimary>
)

const NavigationLayout: FC<MobileMenuProps> = ({
  className,
  isAnimated = false,
}) => {
  const divRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)
  const router = useRouter()
  const [activeLink, setActiveLink] = useState('')
  useEffect(() => {
    setActiveLink(router.asPath)
  }, [router.asPath])

  useEffect(() => {
    if (divRef.current) {
      const heightOfDiv = divRef.current.offsetHeight
      setHeight(heightOfDiv)
    }
  }, [])

  return isAnimated ? (
    <motion.div
      className={classNames(styles['header__content_desktop'], [className])}
      data-lenis-prevent
    >
      <div className={styles['navigation']} ref={divRef}>
        <nav className={styles['navigation__content']}>
          {navigationHeaderLinks.map((item) => (
            <Link
              scroll={false}
              className={classNames(styles['navigation__content_link'], {
                [styles['active']]: item.href === activeLink,
              })}
              href={item.href}
              key={item.description}
            >
              <AnimatedTextCharacter text={item.description} />
            </Link>
          ))}
        </nav>
        <motion.div
          variants={buttonVariant}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {button}
        </motion.div>
      </div>
    </motion.div>
  ) : (
    <div className={styles['header__content_desktop']}>
      <div className={styles['navigation']}>
        <nav className={styles['navigation__content']}>
          {navigationHeaderLinks.map((item) => (
            <Link
              scroll={false}
              className={classNames(styles['navigation__content_link'], {
                [styles['active']]: item.href === activeLink,
              })}
              href={item.href}
              key={item.description}
            >
              {item.description}
            </Link>
          ))}
        </nav>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          {button}
        </motion.div>
      </div>
    </div>
  )
}

export default memo(NavigationLayout)
