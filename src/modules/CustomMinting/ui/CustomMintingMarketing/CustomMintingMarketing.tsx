import { FC } from 'react'
import classNames from 'classnames'
import dynamic from 'next/dynamic'
import { data } from '@/modules/CustomMinting/ui/CustomMintingMarketing/data'
import { BackgroundImage } from '@/ui/BackgroundImage/BackgroundImage'
import ParallaxSection from '@/ui/ParallaxSection/ParallaxSection'
const AnimatedText = dynamic(() => import('@/ui/AnimatedText/AnimatedText'))
const AbstractLogo = dynamic(() => import('@/ui/AbstractLogo/AbstractLogo'), {
  ssr: false,
})
import styles from './CustomMintingMarketing.module.scss'

const CustomMintingMarketing: FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={classNames(styles['marketing'], className)}>
      <ParallaxSection>
        <AbstractLogo className={styles['marketing__abstract']} />
      </ParallaxSection>
      {data && data.length > 0
        ? data.map((item, index) => {
            return (
              <div className={styles['marketing__row']} key={index}>
                <div className="row">
                  <div
                    className={`${
                      index % 2 == 0 ? 'order-md-2 offset-md-1' : ''
                    } col-md-6`}
                  >
                    <div className={styles['marketing__thumb']}>
                      <BackgroundImage
                        alt={item.title}
                        src={item.thumb}
                        className={styles['marketing__thumb_item']}
                        parallax
                        parallaxValues={[-100, 100]}
                      />
                    </div>
                  </div>
                  <div
                    className={`${
                      index % 2 == 0
                        ? 'order-md-1 col-md-5'
                        : 'col-md-5 offset-md-1'
                    }`}
                  >
                    <div className={styles['marketing__description']}>
                      <ParallaxSection parallaxValues={[100, -100]}>
                        <p
                          className={classNames(
                            styles['marketing__description_title'],
                            'h2'
                          )}
                        >
                          <AnimatedText title withBlueDot>
                            {`${item.title}`}
                          </AnimatedText>
                        </p>
                        <div className={styles['marketing__description_item']}>
                          <p>
                            <AnimatedText>{item.description}</AnimatedText>
                          </p>
                        </div>
                      </ParallaxSection>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        : null}
    </div>
  )
}

export default CustomMintingMarketing
