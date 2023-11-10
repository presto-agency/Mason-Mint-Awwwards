import { FC, ReactNode, useContext, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Footer } from '@/components/Footer/Footer'
import { Store } from '@/utils/Store'
import { useLenis } from '@studio-freight/react-lenis'
import { useCursor } from '../CursorLayout/CursorLayout'

const variants = {
  initial: {
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

const innerVariant = {
  initial: {
    y: '100svh',
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  animate: {
    y: 0,
    transition: {
      delay: 3.7,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

const PageTransitionLayout: FC<{ children: ReactNode; isFooter?: boolean }> = ({
  children,
  isFooter = true,
}) => {
  const store = useContext(Store)
  const { setActionType } = useCursor()
  const lenis = useLenis()

  const isFirstLoading = () => {
    if (store?.state.isFirstLoading) {
      store?.dispatch({ type: 'TOGGLE_FIRST_LOADING' })
    }
    // Enable scroll
    if (lenis) {
      lenis.start()
    }
  }

  useEffect(() => {
    setActionType?.('default')
  }, [setActionType])

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={store?.state.isFirstLoading ? innerVariant : variants}
      onAnimationComplete={isFirstLoading}
    >
      {children}
      {isFooter && <Footer />}
    </motion.div>
  )
}
export default PageTransitionLayout
