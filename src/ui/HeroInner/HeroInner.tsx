import { FC, useMemo } from 'react'
import dynamic from 'next/dynamic'
import classNames from 'classnames'
import Container from '@/app/layouts/Container'
import AnimatedText from '@/ui/AnimatedText/AnimatedText'

import styles from './HeroInner.module.scss'

const AbstractLogo = dynamic(() => import('@/ui/AbstractLogo/AbstractLogo'), {
  ssr: false,
})

type HeroInnerProps = {
  className?: string
  title?: string
  subtitle?: string
  description?: string
  theme?: 'white' | 'gray'
  withBlueDot?: boolean
  columns?: number
  centeredOnDesktop?: boolean
  width?: string
}

const HeroInner: FC<HeroInnerProps> = ({
  className,
  title,
  subtitle,
  description,
  theme = 'white',
  withBlueDot = true,
  centeredOnDesktop = false,
  columns = centeredOnDesktop ? 12 : 8,
  width = centeredOnDesktop ? '85%' : '100%',
}) => {
  const mods = {
    [styles['centeredDesktop']]: centeredOnDesktop,
  }

  const containerWidth = useMemo(() => {
    return { width }
  }, [width])

  const colClassName = `col-md-${columns}`
  return (
    <div className={classNames(styles['hero'], styles[theme], className)}>
      <AbstractLogo className={styles['hero__abstract']} parallax />
      <Container className={classNames(mods)}>
        <div style={containerWidth} className={classNames('row', mods)}>
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
