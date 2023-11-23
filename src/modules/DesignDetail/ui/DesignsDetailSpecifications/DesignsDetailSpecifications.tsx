import { FC, useMemo } from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'

import { ProductProps } from '@/utils/types'
import classNames from 'classnames'

import { BlueDot } from '@/ui/BlueDot'
const ParallaxSection = dynamic(
  () => import('@/ui/ParallaxSection/ParallaxSection'),
  { ssr: false }
)

import styles from './DesignsDetailSpecifications.module.scss'

const AnimatedText = dynamic(() => import('@/ui/AnimatedText/AnimatedText'))

type DesignsDetailSpecificationsProps = {
  className?: string
  product?: ProductProps
}

const DesignsDetailSpecifications: FC<DesignsDetailSpecificationsProps> = ({
  className,
  product,
}) => {
  const image1 = useMemo(() => {
    if (!product?.additionalImages || !product?.additionalImages[0]) {
      return undefined
    }
    return product.additionalImages[0].ImageUrl
  }, [product])

  const image2 = useMemo(() => {
    if (!product?.additionalImages || !product?.additionalImages[1]) {
      return undefined
    }
    return product?.additionalImages[1].ImageUrl
  }, [product])

  return (
    <section
      className={classNames(styles['DesignsDetailSpecifications'], className)}
    >
      <div className={styles['contentBlock']}>
        <div className={styles['left']}>
          <div className={styles['title']}>
            <h6>our technology</h6>
            <h1>
              Discover the Lost City
              <BlueDot />
            </h1>
          </div>
          {image1 && (
            <div className={styles['photo']}>
              <Image src={image1} alt="Product gallery image" fill />
            </div>
          )}
        </div>
        <ParallaxSection
          className={classNames(
            styles['right'],
            !image1 && !image2 ? styles['noPhotos'] : false
          )}
          parallaxValues={[100, -100]}
        >
          {image2 && (
            <div className={styles['photo']}>
              <Image src={image2} alt="Product gallery image" fill />
            </div>
          )}
          <ul className={styles['specifications__list']}>
            <h4>
              <AnimatedText>Specifications:</AnimatedText>
            </h4>
            {product?.Metal && (
              <li className={styles['specifications__list_item']}>
                <p className={styles['specifications__list_item_label']}>
                  <AnimatedText>Metal</AnimatedText>
                </p>
                <h5 className={styles['specifications__list_item_value']}>
                  <AnimatedText>{product?.Metal}</AnimatedText>
                </h5>
              </li>
            )}
            {product?.specification[0] &&
              Object.entries(product.specification[0]).map(
                ([key, value], index) => {
                  if (value && value !== '') {
                    return (
                      <li
                        key={index}
                        className={styles['specifications__list_item']}
                      >
                        <p
                          className={styles['specifications__list_item_label']}
                        >
                          <AnimatedText>
                            {key.split(/(?=[A-Z])/).join(' ')}
                          </AnimatedText>
                        </p>
                        <p
                          className={styles['specifications__list_item_value']}
                        >
                          <AnimatedText>{value}</AnimatedText>
                        </p>
                      </li>
                    )
                  }
                }
              )}
          </ul>
        </ParallaxSection>
      </div>
    </section>
  )
}

export default DesignsDetailSpecifications
