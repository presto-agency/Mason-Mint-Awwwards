import { FC, useContext, useMemo } from 'react'
import { AnimatePresence } from 'framer-motion'
import classNames from 'classnames'

import Emoji from 'public/icons/emoji.svg'
import { CategoryBlock } from './CategoryBlock/CategoryBlock'

import { ProductProps } from '@/utils/types'
import { ProducsSectionContext } from '../../lib/ProductListContext'

import styles from './ProductList.module.scss'

type ProductListProps = {
  className?: string
  loading: boolean
  products: ProductProps[]
}

const ProductList: FC<ProductListProps> = ({
  className,
  products,
  loading,
}) => {
  const { filters } = useContext(ProducsSectionContext)

  const data = useMemo(() => {
    const hash = new Map<string, ProductProps[]>()

    if (products.length) {
      for (const product of products) {
        const categoryId = product?.category?.id
        if (categoryId) {
          if (!hash.has(categoryId)) {
            hash.set(categoryId, [product])
            continue
          }

          if (hash.has(categoryId)) {
            const productsInCategory = hash.get(categoryId)!
            hash.set(categoryId, [...productsInCategory, product])
          }
        }
      }
    }

    const result = Array.from(hash, ([categoryId, products]) => {
      return {
        categoryId,
        products,
      }
    })

    hash.clear()
    return result
  }, [products])

  return (
    <div className={classNames(styles['ProductList'], className)}>
      <AnimatePresence mode="sync">
        {!data.length && (
          <div className={classNames(styles['fullSize'], styles['notFound'])}>
            <Emoji />
            <h4>
              We were unable to find any products for
              <span>&quot;{filters.search}&quot;</span>
            </h4>
            <p>
              Don&apos;t give up! Check the spelling or rephrase your search
              query.
            </p>
          </div>
        )}

        {data.length &&
          !loading &&
          data.map((categoryBlock) => {
            return (
              <CategoryBlock
                categoryId={categoryBlock.categoryId}
                products={categoryBlock.products}
                key={categoryBlock.categoryId}
              />
            )
          })}
      </AnimatePresence>
    </div>
  )
}

export default ProductList
