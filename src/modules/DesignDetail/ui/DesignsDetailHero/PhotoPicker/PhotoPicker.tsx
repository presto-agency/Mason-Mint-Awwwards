import { FC } from 'react'
import classNames from 'classnames'
import { ProductProps } from '@/utils/types'
import styles from './PhotoPicker.module.scss'
import Image from 'next/image'
import { toLoverCaseAndSpacesToHyphen } from '@/utils/string/toLoverCaseAndSpacesToHyphen'
import dynamic from 'next/dynamic'

const AnimatedElement = dynamic(
  () => import('@/ui/AnimatedElement/AnimatedElement')
)

type PhotoPickerProps = {
  className?: string
  product?: ProductProps
  activeSide: 'obverse' | 'reverse'
  flip: (valueToSet: 'obverse' | 'reverse') => void
}

export const PhotoPicker: FC<PhotoPickerProps> = ({
  className,
  product,
  activeSide,
  flip,
}) => {
  const categorySlug = product
    ? toLoverCaseAndSpacesToHyphen(product.category?.name as string)
    : ''

  return (
    <div className={classNames(styles['PhotoPicker'], className)}>
      <AnimatedElement className={styles['title']}>
        <h6>pick finish</h6>
      </AnimatedElement>
      <AnimatedElement className={styles['thumbs']}>
        {product?.mainImages && (
          <>
            <div
              className={classNames(
                styles['thumbs__itemWrapper'],
                activeSide === 'obverse' && styles['selected']
              )}
              style={
                categorySlug
                  ? {
                      backgroundImage: `url(/images/category-shadows/${categorySlug}.svg)`,
                    }
                  : {}
              }
            >
              <div
                className={styles['thumbs__item']}
                onClick={() => flip('obverse')}
              >
                <Image
                  src={
                    product.mainImages.obverse || '/images/coin-placeholder.png'
                  }
                  fill
                  alt={product.ProductName}
                />
              </div>
            </div>
            <div
              className={classNames(
                styles['thumbs__itemWrapper'],
                activeSide === 'reverse' && styles['selected']
              )}
              style={
                categorySlug
                  ? {
                      backgroundImage: `url(/images/category-shadows/${categorySlug}.svg)`,
                    }
                  : {}
              }
            >
              <div
                className={styles['thumbs__item']}
                onClick={() => flip('reverse')}
              >
                <Image
                  src={
                    product.mainImages.reverse || '/images/coin-placeholder.png'
                  }
                  fill
                  alt={product.ProductName}
                />
              </div>
            </div>
          </>
        )}
      </AnimatedElement>
    </div>
  )
}
