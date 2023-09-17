import { FC } from 'react'
import classNames from 'classnames'
import dynamic from 'next/dynamic'
import { data } from './data'
import { BackgroundImage } from '@/ui/BackgroundImage/BackgroundImage'

const AnimatedText = dynamic(() => import('@/ui/AnimatedText/AnimatedText'))
const AbstractLogo = dynamic(() => import('@/ui/AbstractLogo/AbstractLogo'), {
  ssr: false,
})

import styles from './CustomMintingMarketing.module.scss'

const CustomMintingMarketing: FC<{ className?: string }> = ({ className }) => {
  return (
    <section
      className={classNames(styles['CustomMintingMarketing'], className)}
    >
      <AbstractLogo className={styles['abstract']} />
      {data.map((item, index) => {
        return (
          <div key={index} className={styles['contentBlock']}>
            <div className={styles['title']}>
              <h2>
                <AnimatedText title withBlueDot>
                  {item.title}
                </AnimatedText>
              </h2>
              <p>
                <AnimatedText>{item.description}</AnimatedText>
              </p>
            </div>
            <div className={styles['descriptor']}>
              <h6>
                <AnimatedText>{item.descriptor}</AnimatedText>
              </h6>
            </div>
            <div className={styles['photo']}>
              <BackgroundImage
                alt={item.title}
                src={item.thumb}
                className={styles['photo__item']}
                parallax
                parallaxValues={[-100, 100]}
              />
            </div>
          </div>
        )
      })}
    </section>
  )
}

export default CustomMintingMarketing
