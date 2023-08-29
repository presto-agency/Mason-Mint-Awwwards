import { FC, Fragment, useMemo, useRef } from 'react'
import classNames from 'classnames'
import { useInView, motion } from 'framer-motion'

import styles from './AnimatedText.module.scss'

type AnimatedTextProps = {
  className?: string
  children: string
  title?: boolean
  withBlueDot?: boolean
}

const AnimatedText: FC<AnimatedTextProps> = ({
  children,
  title = false,
  withBlueDot = false,
  className,
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const stringArray = useMemo(() => {
    return children.split(' ')
  }, [children])

  const container = {
    visible: () => ({
      transition: { staggerChildren: 0.01, delayChildren: 0.2 },
    }),
  }

  const wordFrame = {
    visible: {
      opacity: 1,
      rotateX: 0,
      rotate: 0,
      y: 0,
      transition: {
        type: 'spring',
        duration: 1.2,
        bounce: 0,
      },
    },
    hidden: title
      ? {
          opacity: 0,
          y: '100%',
          rotate: 5,
        }
      : {
          opacity: 0,
          y: 5,
          rotateX: -50,
          rotate: 2,
        },
  }

  return (
    <motion.span
      className={classNames(
        styles['split'],
        title ? styles['title'] : '',
        className
      )}
      ref={ref}
      variants={container}
      initial="hidden"
      animate={isInView ? 'visible' : ''}
    >
      <>
        {stringArray.map((word, index) => {
          return (
            <Fragment key={index}>
              <motion.span
                className={styles['split__word']}
                variants={wordFrame}
              >
                {word}
              </motion.span>
              {stringArray.length - 1 > index && <span> </span>}
            </Fragment>
          )
        })}
        {withBlueDot && (
          <motion.span
            className={classNames(styles['split__word'], 'blue')}
            variants={wordFrame}
          >
            .
          </motion.span>
        )}
      </>
    </motion.span>
  )
}

export default AnimatedText
