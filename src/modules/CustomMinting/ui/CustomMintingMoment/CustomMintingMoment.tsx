import { FC } from 'react'
import classNames from 'classnames'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { ButtonPrimary } from '@/ui/ButtonPrimary/ButtonPrimary'
import { BackgroundImage } from '@/ui/BackgroundImage/BackgroundImage'
import ParallaxSection from '@/ui/ParallaxSection/ParallaxSection'
import routes from '@/utils/routes'

const AnimatedElement = dynamic(
  () => import('@/ui/AnimatedElement/AnimatedElement')
)
const AnimatedText = dynamic(() => import('@/ui/AnimatedText/AnimatedText'))

import styles from './CustomMintingMoment.module.scss'

const CustomMintingMoment: FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={classNames(styles['moment'], className)}>
      <div className="row">
        <div className="col-md-4">
          <ParallaxSection parallaxValues={[0, 300]}>
            <h3 className={classNames(styles['moment__title'], 'h3')}>
              <AnimatedText title withBlueDot>
                Make Your Brand Stand Out
              </AnimatedText>
            </h3>
            <div className={styles['moment__description']}>
              <p>
                <AnimatedText>
                  Highlight your corporate brand, organization, or promote your
                  one-of-a-kind idea for a custom coin series!
                </AnimatedText>
              </p>
              <p>
                <AnimatedText>
                  Our team of professionals will guide you through the project
                  from start to finish.
                </AnimatedText>
              </p>
            </div>
            <div className={styles['moment__action']}>
              <AnimatedElement>
                <Link scroll={false} href={routes.public.contactUs}>
                  <ButtonPrimary variant="transparent">
                    Contact us
                  </ButtonPrimary>
                </Link>
              </AnimatedElement>
            </div>
          </ParallaxSection>
        </div>
        <div className="col-md-6 offset-md-1">
          <div className={styles['moment__banner']}>
            <p className={styles['moment__banner_label']}>
              welcome to masonmint
            </p>
            <BackgroundImage
              src="/images/custom-minting/mark-banner.jpg"
              alt="Mark the Moment with Exceptional Pieces"
              className={styles['moment__banner_item']}
              parallax
              parallaxValues={[-200, 200]}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomMintingMoment
