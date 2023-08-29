import { FC } from 'react'
import dynamic from 'next/dynamic'
import classNames from 'classnames'
import Container from '@/app/layouts/Container'
const AbstractLogo = dynamic(() => import('@/ui/AbstractLogo/AbstractLogo'), {
  ssr: false,
})
const AnimatedText = dynamic(() => import('@/ui/AnimatedText/AnimatedText'))

import styles from './HeroInner.module.scss'

type HeroInnerProps = {
  className?: string
  title?: string
  subtitle?: string
  description?: string
  theme?: 'white' | 'gray'
  withBlueDot?: boolean
  columns?: number
}

const HeroInner: FC<HeroInnerProps> = ({
  className,
  title,
  subtitle,
  description,
  theme = 'white',
  withBlueDot = true,
  columns = 8,
}) => {
  const colClassName = `col-md-${columns}`
  return (
    <div className={classNames(styles['hero'], styles[theme], className)}>
      <AbstractLogo className={styles['hero__abstract']} parallax />
      <Container>
        <div className="row">
          <div className={colClassName}>
            <p className={styles['hero__subtitle']}>
              <AnimatedText>{`${subtitle}`}</AnimatedText>
            </p>
            <h1 className={styles['hero__title']}>
              <AnimatedText
                withBlueDot={withBlueDot}
                title
              >{`${title}`}</AnimatedText>
            </h1>
          </div>
          {description && (
            <div className="col-md-6">
              <p className={styles['hero__description']}>
                <AnimatedText>{`${description}`}</AnimatedText>
              </p>
            </div>
          )}
        </div>
      </Container>
    </div>
  )
}

export default HeroInner
