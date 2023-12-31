import { FC, useContext } from 'react'
import classNames from 'classnames'

import { useLenis } from '@studio-freight/react-lenis'
import { CategoryProps } from '@/utils/types'
import { ProducsSectionContext } from '../../lib/ProductListContext'

import styles from './ProductFilters.module.scss'

type ProductFiltersProps = {
  className?: string
  categories: CategoryProps[]
  productsCount: number
}

const ProductFilters: FC<ProductFiltersProps> = ({
  className,
  categories,
  productsCount,
}) => {
  const { activeSection, scrollTop } = useContext(ProducsSectionContext)
  const lenis = useLenis()

  return (
    <div className={classNames(styles['ProductFilters'], className)}>
      {categories.length ? (
        <div className={styles['allProductsCount']}>
          All products, {productsCount} results
        </div>
      ) : null}
      <ul className={styles['list']}>
        {categories?.map((category, index) => {
          return (
            <li
              key={category.id}
              className={classNames(
                styles['listItem'],
                activeSection === category.id ? styles['active'] : ''
              )}
              onClick={() => {
                if (index === 0) {
                  scrollTop?.()
                  return
                }

                const element = document.getElementById(
                  `category-${category.id}`
                )

                if (element) {
                  const pos =
                    element?.getBoundingClientRect().top + window.scrollY + 1

                  lenis.scrollTo(pos, {
                    duration: 1.5,
                    force: true,
                  })
                }
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
