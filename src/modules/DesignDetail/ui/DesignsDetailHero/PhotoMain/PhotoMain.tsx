import { FC, memo } from 'react'
import { ProductProps } from '@/utils/types'
import classNames from 'classnames'
import Image from 'next/image'
import { motion } from 'framer-motion'
import styles from './PhotoMain.module.scss'

type PhotoMainProps = {
  className?: string
  product: ProductProps
  activeSide: 'obverse' | 'reverse'
}

const PhotoMain: FC<PhotoMainProps> = ({ product, className, activeSide }) => {
  return (
    <div className={classNames(styles['photoMain'], className)}>
      <motion.div
        className={classNames(
          styles['image'],
          styles[`active-side-${activeSide}`]
        )}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className={classNames(styles['image__side'], styles['front'])}>
          <Image
            src={product.mainImages?.obverse || '/images/coin-placeholder.png'}
            fill
            quality={100}
            alt={product.ProductName}
          />
        </div>
        <div className={classNames(styles['image__side'], styles['back'])}>
          <Image
            src={product.mainImages?.reverse || '/images/coin-placeholder.png'}
            fill
            quality={100}
            alt={product.ProductName}
          />
        </div>
      </motion.div>
    </div>
  )
}

export default memo(PhotoMain)
