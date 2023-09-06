import { FC, useRef } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import classNames from 'classnames'
import { useScroll, useTransform, motion } from 'framer-motion'
import useWindowDimensions from '@/hooks/useWindowDimensions'

import { ButtonPrimary } from '@/ui/ButtonPrimary/ButtonPrimary'
import AnimatedText from '@/ui/AnimatedText/AnimatedText'
import AnimatedElement from '@/ui/AnimatedElement/AnimatedElement'
import routes from '@/utils/routes'
import { BlueDot } from '@/ui/BlueDot'

const VideoComponent = dynamic(
  () => import('@/ui/VideoComponent/VideoComponent')
)

import styles from './BecomeDistributorNew.module.scss'

type BecomeDistributorNewProps = {
  className?: string
}

const BecomeDistributorNew: FC<BecomeDistributorNewProps> = ({ className }) => {
  const ref = useRef<HTMLElement | null>(null)
  const { width } = useWindowDimensions()

  const { scrollYProgress } = useScroll({
    target: ref,
  })

  const progress = useTransform(scrollYProgress, [0, 1], ['0%', '-80%'])
  const spanTop = useTransform(scrollYProgress, [0, 1], ['-50%', '0%'])
  const spanBottom = useTransform(scrollYProgress, [0, 1], ['50%', '0%'])

  const title = useTransform(
    scrollYProgress,
    [0, 1],
    ['0%', width > 767 ? '750%' : '300%']
  )

  return (
    <section
      ref={ref}
      className={classNames(styles['BecomeDistributorSection'], className)}
    >
      <div className={styles['stickyContainer']}>
        <div className={styles['BecomeDistributorSection__content']}>
          <VideoComponent src="/video/CTA.mp4" />
          <h2 className="h2">
            <AnimatedText title>Become An Authorized Distributor</AnimatedText>
          </h2>
          <p
            className={styles['BecomeDistributorSection__content_description']}
          >
            <AnimatedText>
              Our authorized dealer partners have access to our entire line of
              products at industry leading wholesale prices.
            </AnimatedText>
          </p>
          <AnimatedElement className={styles['buttonContainer']} delay={0.2}>
            <Link scroll={false} href={routes.public.becomeDistributor}>
              <ButtonPrimary
                className={styles['buttonContainer__button']}
                variant="blue"
              >
                Join now
              </ButtonPrimary>
            </Link>
          </AnimatedElement>
        </div>
        <div className={styles['wrapper']}>
          <motion.div
            transition={{ ease: 'easeInOut', duration: 0.3 }}
            style={{ top: progress }}
            className={styles['top']}
          >
            <motion.div
              className={styles['title']}
              style={{ x: '-50%', y: title }}
            >
              <h6>content</h6>
              <h4>This is your chance</h4>
            </motion.div>
            <motion.span
              style={{ y: spanTop }}
              className={styles['text']}
              transition={{ ease: 'easeInOut', duration: 0.6 }}
            >
              don&apos;t miss it <BlueDot />
            </motion.span>
          </motion.div>
          <motion.div
            transition={{ ease: 'easeInOut', duration: 0.3 }}
            style={{ bottom: progress }}
            className={styles['bottom']}
          >
            <motion.span
              transition={{ ease: 'easeInOut', duration: 0.6 }}
              style={{ y: spanBottom }}
              className={styles['text']}
            >
              don&apos;t miss it <BlueDot />
            </motion.span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default BecomeDistributorNew
