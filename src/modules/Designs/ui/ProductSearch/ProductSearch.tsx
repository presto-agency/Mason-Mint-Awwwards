import {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react'
import classNames from 'classnames'
import Search from '@/ui/Icons/Search'
import styles from './ProductSearch.module.scss'
import { useDebounce } from 'usehooks-ts'
import { ProductsFilter } from '../../api/products'

type Props = {
  className?: string
  setFilters: Dispatch<SetStateAction<ProductsFilter>>
  scrollTop: () => void
}

const ProductSearch: FC<Props> = ({ className, setFilters, scrollTop }) => {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const debouncedSearchQuery = useDebounce(searchQuery, 500)

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setSearchQuery(e.target.value)
    },
    [setSearchQuery]
  )

  useEffect(() => {
    scrollTop()
    setFilters((prev) => {
      return {
        ...prev,
        category: undefined,
        search: debouncedSearchQuery,
      }
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
