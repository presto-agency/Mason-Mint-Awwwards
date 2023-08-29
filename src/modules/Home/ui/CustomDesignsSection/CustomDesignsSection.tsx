import { FC } from 'react'
import classNames from 'classnames'
import Link from 'next/link'
import { ButtonPrimary } from '@/ui/ButtonPrimary/ButtonPrimary'
import Container from '@/app/layouts/Container'
import AnimatedText from '@/ui/AnimatedText/AnimatedText'
import AnimatedElement from '@/ui/AnimatedElement/AnimatedElement'
import useWindowDimensions from '@/hooks/useWindowDimensions'
import { BackgroundImage } from '@/ui/BackgroundImage/BackgroundImage'
import routes from '@/utils/routes'
import AnimateScaleBg from '@/ui/AnimateScaleBG/AnimateScaleBG'

import styles from './CustomDesignsSection.module.scss'

const images = [
  '/images/home/customDesign/slide_1.jpg',
  '/images/home/customDesign/slide_2.jpg',
  '/images/home/customDesign/slide_3.jpg',
  '/images/home/customDesign/slide_4.jpg',
  '/images/home/customDesign/slide_5.jpg',
]

const CustomDesignsSection: FC<{ className?: string }> = ({ className }) => {
  const { width } = useWindowDimensions()

  return (
    <section className={classNames(styles['CustomDesignsSection'], className)}>
      {width > 767 ? (
        <AnimateScaleBg images={images} />
      ) : (
        <div className={styles['CustomDesignsSection__mob']}>
          <BackgroundImage
            className={styles['CustomDesignsSection__mob_image']}
            src="/images/home/customDesign/slide_mob_1.jpg"
            alt="Custom Minting Program"
          />
        </div>
      )}
      <Container>
        <div className={styles['CustomDesignsSection__content']}>
          <h6
            className={classNames(
              'h6',
              styles['CustomDesignsSection__content_subtitle']
            )}
          >
            <AnimatedText title>custom design</AnimatedText>
          </h6>
          <h2
            className={classNames(
              'h2',
              styles['CustomDesignsSection__content_title']
            )}
          >
            <AnimatedText title withBlueDot>
              Custom Minting Program
            </AnimatedText>
          </h2>
          <p className={styles['CustomDesignsSection__content_description']}>
            <AnimatedText>
              Minted to the same standard of excellence for which Mason Mint is
              known for, stand out from your competition with your own custom
              minted silver coin or bar.
            </AnimatedText>
          </p>
          <AnimatedElement delay={0.2}>
            <Link scroll={false} href={routes.public.customMinting}>
              <ButtonPrimary
                className={styles['CustomDesignsSection__content_button']}
              >
                Learn more
              </ButtonPrimary>
            </Link>
          </AnimatedElement>
        </div>
      </Container>
    </section>
  )
}

export default CustomDesignsSection
