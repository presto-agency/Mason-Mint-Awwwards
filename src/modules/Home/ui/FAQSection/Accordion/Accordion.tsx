import React, { FC } from 'react'
import classNames from 'classnames'
import { motion, AnimatePresence } from 'framer-motion'
import { BackgroundImage } from '@/ui/BackgroundImage/BackgroundImage'
import ArrowSelect from '@/ui/Icons/ArrowSelect'
import AnimatedText from '@/ui/AnimatedText/AnimatedText'

import styles from './Accordion.module.scss'

type AccordionType = {
  i: number
  expanded: boolean | number
  setExpanded: React.Dispatch<React.SetStateAction<number | false>>
  description?: string
  src: string
  title?: string
}

const Accordion: FC<AccordionType> = ({
  i,
  expanded,
  setExpanded,
  src,
  title,
  description,
}) => {
  const isOpen = i === expanded

  return (
    <li className={styles['item']}>
      <motion.h5
        initial={false}
        animate={{
          color: isOpen ? 'var(--primary-color)' : 'var(--black)',
        }}
        className={classNames('h5', styles['item__title'])}
        onClick={() => setExpanded(isOpen ? false : i)}
      >
        <AnimatedText
          className={styles['item__title_inner']}
          title
        >{`${title}`}</AnimatedText>
        <ArrowSelect
          className={classNames(styles['item__title_arrow'], {
            [styles['active']]: isOpen,
          })}
        />
      </motion.h5>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key={i}
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: 'auto' },
              collapsed: { opacity: 0, height: 0, transition: { delay: 0.1 } },
            }}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
            className={styles['item__dropdownMenu']}
          >
            <motion.div
              style={{ overflow: 'hidden' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.2 } }}
              exit={{ opacity: 0 }}
            >
              <BackgroundImage
                className={styles['item__dropdownMenu_photoContainer']}
                src={src}
                alt="coin"
                quality={100}
              />
              <div
                className={styles['item__dropdownMenu_description']}
                dangerouslySetInnerHTML={{ __html: description as string }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  )
}

export default Accordion
