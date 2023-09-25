import {
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react'
import classNames from 'classnames'
import { CategoryProps } from '@/utils/types'
import styles from './ProductFilters.module.scss'
import { ProductsFilter } from '../../api/products'
import { ProducsSectionContext } from '../../lib/ProductListContext'

type ProductFiltersProps = {
  categories: CategoryProps[]
  filters: ProductsFilter
  setFilters: Dispatch<SetStateAction<ProductsFilter>>
  scrollTop: () => Promise<void>
  className?: string
}

const ProductFilters: FC<ProductFiltersProps> = ({
  className,
  categories,
  filters,
  scrollTop,
  setFilters,
}) => {
  const { clearSearch } = useContext(ProducsSectionContext)
  const allProductsCount = useMemo(() => {
    return categories.reduce(
      (prev, curr) => prev + (curr.products?.length || 0),
      0
    )
  }, [categories])

  return (
    <div className={classNames(styles['ProductFilters'], className)}>
      <div
        className={styles['allProductsCount']}
        onClick={() => {
          scrollTop().then(() => {
            clearSearch()
            setFilters((prev) => {
              return {
                ...prev,
                search: '',
                category: undefined,
              }
            })
          })
        }}
      >
        All products, {allProductsCount} results
      </div>
      <ul className={styles['list']}>
        {categories?.map((category, index) => {
          return (
            <li
              key={category.id}
              className={classNames(
                styles['listItem'],
                filters.category === category.id ? styles['active'] : ''
              )}
              onClick={() => {
                scrollTop().then(() => {
                  clearSearch()
                  setFilters((prev) => {
                    return {
                      ...prev,
                      search: '',
                      category: category.id,
                    }
                  })
                })
              }}
            >
              <span>{category.name}</span>
              <div className={styles['categoryCount']}>
                {category.products?.length}
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default ProductFilters
