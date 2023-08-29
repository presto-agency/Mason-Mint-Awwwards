import { FC, ReactNode, useRef } from 'react'
import classNames from 'classnames'
import { useInView, motion, LazyMotion, domAnimation } from 'framer-motion'

import styles from './AnimatedElement.module.scss'

type AnimatedElementProps = {
  children: ReactNode
  className?: string
  delay?: number
  reverse?: boolean
}

const AnimatedElement: FC<AnimatedElementProps> = ({
  children,
  className,
  delay = 0,
  reverse,
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const elementFrame = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        ease: 'anticipate',
        duration: 1.2,
        delay,
      },
    },
    hidden: {
      opacity: 0,
      y: reverse ? -15 : 15,
    },
  }

  return (
    <LazyMotion features={domAnimation}>
      <motion.div
        className={classNames(styles['element'], className)}
        variants={elementFrame}
        initial="hidden"
        animate={isInView ? 'visible' : ''}
        ref={ref}
      >
        {children}
      </motion.div>
    </LazyMotion>
  )
}

export default AnimatedElement
