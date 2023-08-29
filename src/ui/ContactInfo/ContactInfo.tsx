import { FC } from 'react'
import classNames from 'classnames'
import Arrow from '@/ui/Icons/Arrow'
import AnimatedElement from '@/ui/AnimatedElement/AnimatedElement'

import styles from './ContactInfo.module.scss'

const ContactInfo: FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={classNames(styles['list'], className)}>
      <AnimatedElement delay={0}>
        <div className={styles['list__item']}>
          <Arrow
            className={classNames(styles['list__item_arrow'], styles['__1'])}
          />
          <a
            href="mailto:sales@masonmint.com"
            className={classNames('h4', styles['list__item_link'])}
          >
            Sales@MasonMint.com
          </a>
          <Arrow
            className={classNames(styles['list__item_arrow'], styles['__2'])}
          />
        </div>
      </AnimatedElement>
      <AnimatedElement delay={0.1}>
        <div className={styles['list__item']}>
          <Arrow
            className={classNames(styles['list__item_arrow'], styles['__1'])}
          />
          <a
            href="tel:9043268600"
            className={classNames('h4', styles['list__item_link'])}
          >
            904 326 8600
          </a>
          <Arrow
            className={classNames(styles['list__item_arrow'], styles['__2'])}
          />
        </div>
      </AnimatedElement>
    </div>
  )
}

export default ContactInfo
