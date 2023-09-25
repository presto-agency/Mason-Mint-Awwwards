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
import { ProductListContext } from './ProductListContext'
import { CategoryBlock } from './CategoryBlock/CategoryBlock'

import { ProductsFilter, SusccessResponse } from '../../api/products'
import { ProductProps } from '@/utils/types'

import styles from './ProductList.module.scss'

type ProductListProps = {
  products: InfiniteData<SusccessResponse<ProductProps[]>> | undefined
  filters: ProductsFilter
  setCurrentCategoryInView: Dispatch<SetStateAction<string | undefined>>
  loading: boolean
  className?: string
}

const ProductList: FC<ProductListProps> = ({
  className,
  products,
  setCurrentCategoryInView,
  loading,
  filters,
}) => {
  const data = useMemo(() => {
    const hash = new Map<string, ProductProps[]>()

    for (const item of products?.pages || []) {
      for (const product of item.data.docs) {
        const categoryName = product?.category?.name
        if (categoryName) {
          if (!hash.has(categoryName)) {
            hash.set(categoryName, [product])
            continue
          }

          if (hash.has(categoryName)) {
            const productsInCategory = hash.get(categoryName)!
            hash.set(categoryName, [...productsInCategory, product])
          }
        }
      }
    }

    const result = Array.from(hash, ([categoryName, products]) => {
      return {
        categoryName,
        products,
      }
    })

    hash.clear()
    return result
  }, [products])

  const [activeSection, setActiveSection] = useState<string | null>(null)

  useEffect(() => {
    setCurrentCategoryInView(activeSection || undefined)
  }, [activeSection])

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
      <ProductListContext.Provider value={{ activeSection, setActiveSection }}>
        {data.map((categoryBlock) => {
          return (
            <CategoryBlock
              categoryName={categoryBlock.categoryName}
              products={categoryBlock.products}
              key={categoryBlock.categoryName}
            />
          )
        })}
      </ProductListContext.Provider>
    </div>
  )
}

export default ProductList
