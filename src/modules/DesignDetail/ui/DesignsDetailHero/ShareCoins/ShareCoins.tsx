import { FC, memo } from 'react'
import classNames from 'classnames'
import dynamic from 'next/dynamic'
import { ProductProps } from '@/utils/types'

const AnimatedElement = dynamic(
  () => import('@/ui/AnimatedElement/AnimatedElement')
)

import LinkIcon from 'public/icons/link.svg'
import Facebook from 'public/icons/facebook.svg'
import Twitter from 'public/icons/twitter.svg'
import Linkedin from 'public/icons/linkedin.svg'

import styles from './ShareCoins.module.scss'

type ShareCoinsProps = {
  className?: string
  product?: ProductProps
}

const ShareCoins: FC<ShareCoinsProps> = ({ className }) => {
  return (
    <div className={classNames(styles['ShareCoins'], className)}>
      <AnimatedElement>
        <h6>share coins</h6>
      </AnimatedElement>
      <AnimatedElement className={styles['linksList']}>
        <LinkIcon className={styles['icon']} />
        <Facebook className={styles['icon']} />
        <Twitter className={styles['icon']} />
        <Linkedin className={styles['icon']} />
      </AnimatedElement>
    </div>
  )
}

export default memo(ShareCoins)
