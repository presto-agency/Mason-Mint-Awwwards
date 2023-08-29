import { CategoryProps, ProductProps } from '@/utils/types'

import { FC, useCallback, useContext, useEffect, useState } from 'react'
import Container from '@/app/layouts/Container'
import BecomeDistributorSection from '@/components/BecomeDistributorSection/BecomeDistributorSection'
import HeroInner from '@/ui/HeroInner/HeroInner'

import ProductList from './ProductList/ProductList'
import ProductFilter from './ProductFilter/ProductFilter'
import ProductSearch from './ProductSearch/ProductSearch'
import { Store } from '@/utils/Store'

import styles from './DesignsContent.module.scss'

type DesignsContentProps = {
  categories: CategoryProps[]
  products: ProductProps[]
}

const DesignsContent: FC<DesignsContentProps> = ({ categories, products }) => {
  const store = useContext(Store)

  const [filteredCategories, setFilteredCategories] =
    useState<CategoryProps[]>(categories)
  const [searchQuery, setSearchQuery] = useState<string>('')

  useEffect(() => {
    if (store?.dispatch && store?.state.products.length <= 0) {
      store?.dispatch({ type: 'ADD_PRODUCTS', payload: products })
    }
  }, [])

  const handleFilterChange = useCallback((c: CategoryProps[]) => {
    setFilteredCategories(c)
  }, [])

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query)
  }, [])

  const filterProductsBySearch = (products: ProductProps[], query: string) => {
    return products.filter((product: ProductProps) =>
      product.ProductName.toLowerCase().includes(query.toLowerCase())
    )
  }

  const filteredProducts = searchQuery
    ? filterProductsBySearch(products, searchQuery)
    : products

  return (
    <main className={styles['designsContent']}>
      <HeroInner
        title="Anything you can imagine, we can bring to life with the beauty of silver"
        subtitle="Browse by categories"
        description="We are thrilled to provide both investors and collectors with the best designs in the silver bullion industry."
        theme="gray"
        columns={10}
      />
      <div className={styles['designsContent__body']}>
        <Container>
          <div className="row">
            <div className="col-md-6">
              <ProductSearch
                className={styles['designsContent__search']}
                onValues={handleSearchChange}
              />
            </div>
            <div className="col-md-12">
              <ProductFilter
                onChange={handleFilterChange}
                categories={categories}
              />
            </div>
          </div>
        </Container>
        {filteredProducts.length > 0 ? (
          <ProductList
            products={filteredProducts}
            categories={filteredCategories}
            initialCategories={categories}
          />
        ) : (
          <div className={styles['designsContent__empty']}>
            <p className="h5">List is empty</p>
          </div>
        )}
        <BecomeDistributorSection />
      </div>
    </main>
  )
}

export default DesignsContent
