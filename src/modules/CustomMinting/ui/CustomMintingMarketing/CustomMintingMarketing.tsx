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
import CustomMintingContentBlock from '@/modules/CustomMinting/ui/CustomMintingMarketing/CustomMintingContentBlock'

const CustomMintingMarketing: FC<{ className?: string }> = ({ className }) => {
  return (
    <section
      className={classNames(styles['CustomMintingMarketing'], className)}
    >
      <AbstractLogo className={styles['abstract']} />
      {data.map((item, index) => {
        const isMirror = index % 2 === 1

        return (
          <CustomMintingContentBlock
            key={item.title}
            index={index}
            title={item.title}
            description={item.description}
            descriptor={item.descriptor}
            thumb={item.thumb}
            isMirror={isMirror}
          />
        )
      })}
    </section>
  )
}

export default CustomMintingMarketing
