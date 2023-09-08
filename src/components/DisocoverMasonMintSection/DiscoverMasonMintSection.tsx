import { FC, useRef } from 'react'
import { useScroll } from 'framer-motion'

import { Coin } from './Coin/Coin'
import { MarqueeText } from './MarqueeText/MarqueeText'

import styles from './DiscoverMasonMintSection.module.scss'
import classNames from 'classnames'

type DiscoverMasonMintSectionProps = {
  className?: string
}

export const DiscoverMasonMintSection: FC<DiscoverMasonMintSectionProps> = ({
  className,
}) => {
  const targetRef = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
  })

  return (
    <section
      ref={targetRef}
      className={classNames(styles['DiscoverMasonMintSection'], className)}
    >
      <div className={styles['stickyContainer']}>
        <Coin scrollYProgress={scrollYProgress} />
        <MarqueeText
          text={'discover meet mason mint.'}
          scrollYProgress={scrollYProgress}
        />
      </div>
    </section>
  )
}
