import React, { FC } from 'react'
import classNames from 'classnames'
import styles from '@/modules/CustomMinting/ui/CustomMintingMarketing/CustomMintingMarketing.module.scss'
import { BackgroundImage } from '@/ui/BackgroundImage/BackgroundImage'
import AnimatedText from '@/ui/AnimatedText/AnimatedText'

type CustomMintingContentBlock = {
  index: number
  title: string
  description: string
  descriptor: string
  thumb: string
  isMirror: boolean
}

const CustomMintingContentBlock: FC<CustomMintingContentBlock> = ({
  index,
  title,
  description,
  descriptor,
  thumb,
  isMirror,
}) => {
  return (
    <div
      key={index}
      className={classNames(
        styles['contentBlock'],
        isMirror && styles['mirror']
      )}
    >
      <div className={styles['title']}>
        <h2>
          <AnimatedText title withBlueDot>
            {title}
          </AnimatedText>
        </h2>
        <p>
          <AnimatedText>{description}</AnimatedText>
        </p>
      </div>
      <div className={styles['descriptor']}>
        <h6>
          <AnimatedText>{descriptor}</AnimatedText>
        </h6>
      </div>
      <div className={styles['photo']}>
        <BackgroundImage
          alt={title}
          src={thumb}
          cover={true}
          className={styles['photo__item']}
          parallax
          parallaxValues={[-100, 100]}
        />
      </div>
    </div>
  )
}

export default CustomMintingContentBlock
