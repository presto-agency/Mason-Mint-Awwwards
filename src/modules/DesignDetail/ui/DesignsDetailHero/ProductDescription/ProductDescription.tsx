import { FC, memo } from 'react'
import classNames from 'classnames'
import dynamic from 'next/dynamic'
import Link from 'next/link'

import { ProductProps } from '@/utils/types'
import routes from '@/utils/routes'

import { ButtonPrimary } from '@/ui/ButtonPrimary/ButtonPrimary'

const AnimatedText = dynamic(() => import('@/ui/AnimatedText/AnimatedText'))
const AnimatedElement = dynamic(
  () => import('@/ui/AnimatedElement/AnimatedElement')
)
import styles from './ProductDescription.module.scss'

type ProductDescriptionProps = {
  className?: string
  product?: ProductProps
}

const ProductDescription: FC<ProductDescriptionProps> = ({
  className,
  product,
}) => {
  return (
    <div className={classNames(styles['ProductDescription'], className)}>
      <AnimatedElement delay={0}>
        <p className={styles['category']}>{product?.category?.name}</p>
      </AnimatedElement>
      <h4 className={styles['name']}>
        <AnimatedText>{product?.ProductName || ''}</AnimatedText>
      </h4>
      {product?.description && (
        <p className={styles['description']}>
          <AnimatedText>{`${product?.description}`}</AnimatedText>
        </p>
      )}

      <div className={styles['follow']}>
        <AnimatedElement className={styles['fullWidth']} delay={0}>
          <Link
            className={styles['fullWidth']}
            scroll={false}
            href={routes.public.becomeDistributor}
          >
            <ButtonPrimary
              className={styles['fullWidth']}
              variant="transparent"
            >
              Inquire Now
            </ButtonPrimary>
          </Link>
        </AnimatedElement>
      </div>
    </div>
  )
}

export default memo(ProductDescription)
