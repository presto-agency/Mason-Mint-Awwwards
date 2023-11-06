import {
  ChangeEvent,
  FC,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import classNames from 'classnames'
import Search from '@/ui/Icons/Search'

import styles from './ProductSearch.module.scss'
import { useDebounce } from 'usehooks-ts'
import { ProducsSectionContext } from '../../lib/ProductListContext'

type ProductSearchProps = {
  className?: string
}

const ProductSearch: FC<ProductSearchProps> = ({ className }) => {
  const { setFilters, scrollTop } = useContext(ProducsSectionContext)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const debouncedSearchQuery = useDebounce(searchQuery, 500)

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setSearchQuery(e.target.value)
    },
    [setSearchQuery]
  )

  const resetSearch = useCallback(() => {
    setSearchQuery('')
  }, [setSearchQuery])

  useEffect(() => {
    scrollTop?.().then(() => {
      setFilters((prev) => {
        return {
          ...prev,
          search: debouncedSearchQuery,
        }
      })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchQuery, setFilters])

  return (
    <div
      className={classNames(styles['ProductSearch'], className)}
      id="product-search"
    >
      <Search className={styles['icon']} />
      <input
        className={styles['searchInput']}
        placeholder="SEARCH"
        value={searchQuery}
        onChange={handleChange}
      />
      {searchQuery && (
        <button className={styles['reset']} onClick={resetSearch} />
      )}
      <div className={styles['line']}></div>
    </div>
  )
}

export default ProductSearch
