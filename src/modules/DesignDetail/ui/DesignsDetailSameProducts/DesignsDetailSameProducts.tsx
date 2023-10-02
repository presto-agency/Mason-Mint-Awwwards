import { FC } from 'react'
import classNames from 'classnames'
import { MarqueeCarousel } from '@/components/MarqueeCarousel/MarqueeCarousel'
import { ProductProps } from '@/utils/types'
import styles from './DesignsDetailSameProducts.module.scss'

type DesignsDetailSameProductsProps = {
  products: ProductProps[]
  category?: string
  className?: string
}

const DesignsDetailSameProducts: FC<DesignsDetailSameProductsProps> = ({
  products,
  className,
  category,
}) => {
  return (
    <section
      className={classNames(styles['DesignsDetailSameProducts'], className)}
    >
      <div className={styles['title']}>
        {category && <h6>{category.toLowerCase()}</h6>}
        <h2>Coins from this category.</h2>
      </div>
      <MarqueeCarousel data={products} />
    </section>
  )
}

export default DesignsDetailSameProducts
