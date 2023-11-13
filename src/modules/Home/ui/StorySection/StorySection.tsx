import { FC } from 'react'
import dynamic from 'next/dynamic'
import classNames from 'classnames'
import Link from 'next/link'
import { BackgroundImage } from '@/ui/BackgroundImage/BackgroundImage'
import { ButtonPrimary } from '@/ui/ButtonPrimary/ButtonPrimary'
import Container from '@/app/layouts/Container'
import AnimatedText from '@/ui/AnimatedText/AnimatedText'
import AnimatedElement from '@/ui/AnimatedElement/AnimatedElement'
import routes from '@/utils/routes'

const ParallaxSection = dynamic(
  () => import('@/ui/ParallaxSection/ParallaxSection'),
  { ssr: false }
)

import styles from './StorySection.module.scss'

const StorySection: FC = () => {
  return (
    <section className={styles['story']}>
      <ParallaxSection
        className={styles['story__abstract']}
        parallaxValues={[-200, 200]}
      />
      <Container>
        <div className={styles['story__content']}>
          <ParallaxSection
            className={styles['story__content_left']}
            parallaxValues={[100, -100]}
          >
            <h3 className={classNames('h3', styles['title'])}>
              <AnimatedText title>
                Mason Mint was born from the idea of producing world-class
                custom minted silver products
              </AnimatedText>
            </h3>
            <p className={styles['description']}>
              <AnimatedText>
                Mason Mint was born from the idea of producing world-class
                custom minted silver products. Our motto &quot;Excellence In
                Minting&quot; are words that we live by.
              </AnimatedText>
            </p>
            <BackgroundImage
              src="/images/home/home_story_1.png"
              className={styles['photoContainer']}
              alt="Coin photo"
              description="welcome to masonmint"
              parallax
              parallaxValues={[-100, 100]}
            />
          </ParallaxSection>
          <ParallaxSection
            className={styles['story__content_right']}
            parallaxValues={[200, -400]}
          >
            <BackgroundImage
              src="/images/home/home_story_2.png"
              className={styles['photoContainer']}
              quality={100}
              alt="Coin photo"
              parallax
              parallaxValues={[-50, 50]}
            />
            <div className={styles['text']}>
              <h4 className="h4">
                <AnimatedText title>
                  Mason Mint is renowned for its standard of excellence in
                  executing custom designs.
                </AnimatedText>
              </h4>
              <p style={{ color: 'var(--gray-800)' }}>
                <AnimatedText>
                  Our high standards for quality and design is what separates us
                  from everyone else. We look forward to supplying both the
                  investor and collector silver market with superior products
                  that are sure to impress.
                </AnimatedText>
              </p>
            </div>
            <AnimatedElement className={styles['buttonContainer']} delay={0.2}>
              <Link scroll={false} href={routes.public.about}>
                <ButtonPrimary
                  className={styles['buttonContainer__button']}
                  variant="transparent"
                >
                  Our story
                </ButtonPrimary>
              </Link>
            </AnimatedElement>
          </ParallaxSection>
        </div>
      </Container>
    </section>
  )
}

export default StorySection
