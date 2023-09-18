import { FC, useState, useRef, useCallback } from 'react'
import classNames from 'classnames'
import Image from 'next/image'
import { ProductProps } from '@/utils/types'
import { toLoverCaseAndSpacesToHyphen } from '@/utils/string/toLoverCaseAndSpacesToHyphen'
import { motion } from 'framer-motion'

import styles from './DesignsDetailThumbnail.module.scss'

type DesignsDetailThumbnailProps = {
  product: ProductProps | null
  className?: string
}
const DesignsDetailThumbnail: FC<DesignsDetailThumbnailProps> = ({
  product,
  className,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [activeSide, setActiveSide] = useState<'obverse' | 'reverse'>('obverse')
  const [thumbLoaded, setThumbLoaded] = useState<boolean>(false)
  const categorySlug = product
    ? toLoverCaseAndSpacesToHyphen(product.category?.name as string)
    : ''

  const handleFlip = useCallback((valueToSet: 'obverse' | 'reverse') => {
    setActiveSide((prev) => {
      if (prev !== valueToSet) {
        if (audioRef.current) audioRef.current.play()
      }
      return valueToSet
    })
  }, [])

  return (
    <div className={className}>
      <audio
        src="/sounds/coin-rotate-2.mp3"
        ref={audioRef}
        className={styles['image__sound']}
      />
      <div
        className={classNames(
          styles['image'],
          styles[`active-side-${activeSide}`]
        )}
        style={
          categorySlug
            ? {
                backgroundImage: `url(/images/category-shadows/${categorySlug}.svg)`,
              }
            : {}
        }
      >
        {product && (
          <motion.div
            className={styles['image__item']}
            initial={{ opacity: 0 }}
            animate={thumbLoaded ? { opacity: 1 } : {}}
            transition={{ duration: 1 }}
          >
            <div
              className={classNames(
                styles['image__item_side'],
                styles['front']
              )}
            >
              <Image
                src={
                  product.mainImages?.obverse || '/images/coin-placeholder.png'
                }
                fill
                quality={100}
                alt={product.ProductName}
                onLoadingComplete={() => setThumbLoaded(true)}
              />
            </div>
            <div
              className={classNames(styles['image__item_side'], styles['back'])}
            >
              <Image
                src={
                  product.mainImages?.reverse || '/images/coin-placeholder.png'
                }
                fill
                quality={100}
                alt={product.ProductName}
              />
            </div>
          </motion.div>
        )}
      </div>
      <div className={styles['thumbs']}>
        {product?.mainImages && (
          <>
            <div
              className={styles['thumbs__item']}
              onClick={() => handleFlip('obverse')}
            >
              <Image
                src={
                  product.mainImages.obverse || '/images/coin-placeholder.png'
                }
                fill
                alt={product.ProductName}
              />
            </div>
            <div
              className={styles['thumbs__item']}
              onClick={() => handleFlip('reverse')}
            >
              <Image
                src={
                  product.mainImages.reverse || '/images/coin-placeholder.png'
                }
                fill
                alt={product.ProductName}
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default DesignsDetailThumbnail
