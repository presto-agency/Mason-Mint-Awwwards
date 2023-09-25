import { FC, useRef } from 'react'
import styles from '../ProductList.module.scss'
import { ProductProps } from '@/utils/types'
import { useCategoryBlockInView } from './useCategoryBlockInView'
import ProductCard from '@/ui/ProductCard/ProductCard'

type CategoryBlockProps = {
  categoryName: string
  products: ProductProps[]
}

export const CategoryBlock: FC<CategoryBlockProps> = ({
  categoryName,
  products,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  useCategoryBlockInView(ref, categoryName)
  return (
    <div className={styles['categoryList']} key={categoryName} ref={ref}>
      {products.map((product) => (
        <ProductCard data={product} key={product.id} />
      ))}
    </div>
  )
}
