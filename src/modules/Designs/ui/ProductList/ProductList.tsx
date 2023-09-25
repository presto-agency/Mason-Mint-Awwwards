import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from 'react'
import classNames from 'classnames'
import { InfiniteData } from 'react-query'

import Emoji from 'public/icons/emoji.svg'
import { CategoryBlock } from './CategoryBlock/CategoryBlock'

import { ProductsFilter, SusccessResponse } from '../../api/products'
import { ProductProps } from '@/utils/types'

import styles from './ProductList.module.scss'

type ProductListProps = {
  products: InfiniteData<SusccessResponse<ProductProps[]>> | undefined
  filters: ProductsFilter

  loading: boolean
  className?: string
}

const ProductList: FC<ProductListProps> = ({
  className,
  products,
  loading,
  filters,
}) => {
  const data = useMemo(() => {
    const hash = new Map<string, ProductProps[]>()

    for (const item of products?.pages || []) {
      for (const product of item.data.docs) {
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

  if (!data.length && !loading) {
    return (
      <div className={classNames(styles['fullSize'], styles['notFound'])}>
        <Emoji />
        <h4>
          We were unable to find any products for
          <span>&quot;{filters.search}&quot;</span>
        </h4>
        <p>
          Don&apos;t give up! Check the spelling or rephrase your search query.
        </p>
      </div>
    )
  }

  return (
    <div className={classNames(styles['ProductList'], className)}>
      {data.map((categoryBlock) => {
        return (
          <CategoryBlock
            categoryId={categoryBlock.categoryId}
            products={categoryBlock.products}
            key={categoryBlock.categoryId}
          />
        )
      })}
    </div>
  )
}

export default ProductList
