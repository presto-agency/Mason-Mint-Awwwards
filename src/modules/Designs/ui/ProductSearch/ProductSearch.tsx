import {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
} from 'react'
import classNames from 'classnames'
import Search from '@/ui/Icons/Search'
import styles from './ProductSearch.module.scss'
import { useDebounce } from 'usehooks-ts'
import { ProductsFilter } from '../../api/products'

type Props = {
  className?: string
  filters: ProductsFilter
  searchQuery: string
  setSearchQuery: Dispatch<SetStateAction<string>>
  setFilters: Dispatch<SetStateAction<ProductsFilter>>
  scrollTop: () => Promise<void>
}

const ProductSearch: FC<Props> = ({
  searchQuery,
  setSearchQuery,
  className,
  setFilters,
  scrollTop,
}) => {
  const debouncedSearchQuery = useDebounce(searchQuery, 500)

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setSearchQuery(e.target.value)
    },
    [setSearchQuery]
  )

  useEffect(() => {
    scrollTop().then(() => {
      setFilters((prev) => {
        const category =
          debouncedSearchQuery && prev.category ? undefined : prev.category
        return {
          ...prev,
          category: category,
          search: debouncedSearchQuery,
        }
      })
    })
  }, [debouncedSearchQuery, setFilters])

  return (
    <div className={classNames(styles['ProductSearch'], className)}>
      <Search className={styles['icon']} />
      <input
        className={styles['searchInput']}
        placeholder="SEARCH"
        value={searchQuery}
        onChange={handleChange}
      />
      <div className={styles['line']}></div>
    </div>
  )
}

export default ProductSearch
