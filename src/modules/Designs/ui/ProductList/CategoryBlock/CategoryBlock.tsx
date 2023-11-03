import { FC, useRef } from 'react'
import { motion } from 'framer-motion'

import ProductCard from '@/ui/ProductCard/ProductCard'
import { ProductProps } from '@/utils/types'
import { useCategoryBlockInView } from './useCategoryBlockInView'

import styles from '../ProductList.module.scss'

type CategoryBlockProps = {
  categoryId: string
  products: ProductProps[]
}

const boxVariant = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.05,
    },
  },
}
const listVariant = {
  hidden: {
    y: 10,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
  },
}

export const CategoryBlock: FC<CategoryBlockProps> = ({
  categoryId,
  products,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  useCategoryBlockInView(ref, categoryId)

  return (
    <motion.div
      variants={boxVariant}
      animate="visible"
      initial="hidden"
      exit="hidden"
      className={styles['categoryList']}
      key={categoryId}
      id={`category-${categoryId}`}
      ref={ref}
    >
      {products.map((product) => (
        <motion.div key={product.id} variants={listVariant}>
          <ProductCard
            data={product}
            className={styles['categoryList-product']}
          />
        </motion.div>
      ))}
    </motion.div>
  )
}
