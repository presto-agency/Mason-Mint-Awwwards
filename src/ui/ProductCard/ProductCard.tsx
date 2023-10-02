import { FC, MouseEvent, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import classNames from 'classnames'
import { ProductProps } from '@/utils/types'
import { toLoverCaseAndSpacesToHyphen } from '@/utils/string/toLoverCaseAndSpacesToHyphen'
import routes from '@/utils/routes'

import styles from './ProductCard.module.scss'

type ProductCardProps = {
  data: ProductProps
  className?: string
  isDragging?: boolean
  flip?: boolean
  reloadPageOnClick?: boolean
}

const ProductCard: FC<ProductCardProps> = ({
  data,
  className,
  isDragging = false,
  flip = true,
}) => {
  const categorySlug = toLoverCaseAndSpacesToHyphen(
    data.category?.name as string
  )

  const handleClick = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      if (isDragging) {
        e.stopPropagation()
        e.preventDefault()
      }
    },
    [isDragging]
  )

  return (
    <Link
      scroll={false}
      href={{
        pathname: `${routes.public.designs}/${data.id}/${data.slug}`,
      }}
      draggable={false}
      className={classNames(
        styles['product'],
        flip ? styles['enable-flip'] : '',
        className
      )}
      onClick={handleClick}
    >
      <div className={styles['product__thumb']}>
        <div
          className={styles['product__thumb_img']}
          style={{
            backgroundImage: `url(/images/category-shadows/${categorySlug}.svg)`,
          }}
        ></div>
        <div className={styles['product__thumb_item']}>
          {flip ? (
            <>
              <div
                className={classNames(styles['product__side'], styles['front'])}
              >
                <Image
                  src={
                    data.mainImages?.obverse || '/images/coin-placeholder.png'
                  }
                  fill
                  alt={data.ProductName}
                />
              </div>
              <div
                className={classNames(styles['product__side'], styles['back'])}
              >
                <Image
                  src={
                    data.mainImages?.reverse || '/images/coin-placeholder.png'
                  }
                  fill
                  alt={data.ProductName}
                />
              </div>
            </>
          ) : (
            <div className={classNames(styles['product__side'])}>
              <Image
                src={data.mainImages.obverse || ''}
                fill
                alt={data.ProductName}
              />
            </div>
          )}
        </div>
      </div>
      <div className={styles['product__content']}>
        <p className={styles['product__content_title']}>{data.ProductName}</p>
      </div>
    </Link>
  )
}

export default ProductCard
