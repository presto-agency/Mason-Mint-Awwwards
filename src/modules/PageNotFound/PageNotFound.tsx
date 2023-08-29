import { useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import classNames from 'classnames'
import routes from '@/utils/routes'
import Image from 'next/image'
import { motion } from 'framer-motion'
import AnimatedElement from '@/ui/AnimatedElement/AnimatedElement'
import BrokenCoinFirstPart from './assets/images/broken_coin_part_1.png'
import BrokenCoinSecondPart from './assets/images/broken_coin_part_2.png'
const AnimatedText = dynamic(() => import('@/ui/AnimatedText/AnimatedText'))
import { ButtonPrimary } from '@/ui/ButtonPrimary/ButtonPrimary'

import styles from './PageNotFound.module.scss'

const PageNotFound = () => {
  const [loaded, setLoaded] = useState({ first: false, second: false })

  return (
    <div className={styles['empty']}>
      <motion.div
        className={styles['empty__box']}
        initial={{ opacity: 0 }}
        animate={loaded.first && loaded.second ? { opacity: 1 } : {}}
      >
        <p className={styles['empty__label']}>
          <AnimatedText>oops...</AnimatedText>
        </p>
        <div className={styles['empty__core']}>
          <motion.span
            initial={{ x: 3 }}
            animate={loaded.first && loaded.second ? { x: 0 } : {}}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 20,
              delay: 0.5,
            }}
          >
            4
          </motion.span>
          <div className={styles['empty__core_thumb']}>
            <motion.div
              initial={{ rotate: 0 }}
              animate={
                loaded.first && loaded.second ? { rotate: -8, y: 10 } : {}
              }
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 20,
                delay: 0.5,
              }}
              className={classNames(styles['empty__coin'], styles['firstPart'])}
            >
              <Image
                src={BrokenCoinFirstPart.src}
                alt="Broken Coin"
                fill
                className={styles['empty__coin_item']}
                onLoadingComplete={() =>
                  setLoaded((prevState) => {
                    return {
                      ...prevState,
                      first: true,
                    }
                  })
                }
              />
            </motion.div>
            <motion.div
              initial={{ rotate: 0 }}
              animate={loaded.first && loaded.second ? { rotate: 3 } : {}}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 20,
                delay: 0.5,
              }}
              className={classNames(
                styles['empty__coin'],
                styles['secondPart']
              )}
            >
              <Image
                src={BrokenCoinSecondPart.src}
                alt="Broken Coin"
                fill
                className={styles['empty__coin_item']}
                onLoadingComplete={() =>
                  setLoaded((prevState) => {
                    return {
                      ...prevState,
                      second: true,
                    }
                  })
                }
              />
            </motion.div>
          </div>
          <motion.span
            initial={{ x: -3 }}
            animate={loaded.first && loaded.second ? { x: 0 } : {}}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 20,
              delay: 0.5,
            }}
          >
            4
          </motion.span>
        </div>
        <p className={styles['empty__description']}>
          <AnimatedText>
            Page not found. Don&apos;t lose your head, you can always
          </AnimatedText>
        </p>
        <AnimatedElement>
          <Link scroll={false} href={routes.public.index}>
            <ButtonPrimary variant="blue" className={styles['empty__action']}>
              Go back
            </ButtonPrimary>
          </Link>
        </AnimatedElement>
      </motion.div>
    </div>
  )
}

export default PageNotFound
