import { FC, useRef } from 'react'
import styles from '../ProductList.module.scss'
import { ProductProps } from '@/utils/types'
import { useCategoryBlockInView } from './useCategoryBlockInView'
import ProductCard from '@/ui/ProductCard/ProductCard'

type CategoryBlockProps = {
  categoryId: string
  // categoryName: string
  products: ProductProps[]
}

export const CategoryBlock: FC<CategoryBlockProps> = ({
  categoryId,
  products,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  useCategoryBlockInView(ref, categoryId)
  return (
    <div className={styles['categoryList']} key={categoryId} ref={ref}>
      {products.map((product) => (
        <ProductCard data={product} key={product.id} />
      ))}
    </div>
  )
}
