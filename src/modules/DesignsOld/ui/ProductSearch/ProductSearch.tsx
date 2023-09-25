import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react'
import classNames from 'classnames'
import { useDebounce } from 'usehooks-ts'
import TextField from '@/ui/TextField/TextField'
import SearchIcon from '@/ui/Icons/Search'

import styles from './ProductSearch.module.scss'

type ProductSearchProps = {
  className?: string
  onValues: (query: string) => void
}

const ProductSearch: FC<ProductSearchProps> = ({ className, onValues }) => {
  const [query, setQuery] = useState<string>('')
  const [enableSearch, setEnableSearch] = useState<boolean>(false)
  const debouncedSearchQuery = useDebounce(query, 500)

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setQuery(e.target.value)
      setEnableSearch(true)
    },
    [setQuery]
  )

  useEffect(() => {
    const search = async () => {
      if (enableSearch) {
        await onValues(debouncedSearchQuery)
      }
    }

    search()
  }, [debouncedSearchQuery])

  return (
    <div className={classNames(styles['search'], className)}>
      <TextField
        name="search"
        onChange={handleChange}
        placeholder="Search by name"
        value={query}
        className={styles['search__field']}
      />
      {debouncedSearchQuery ? (
        <button
          className={styles['search__reset']}
          onClick={() => setQuery('')}
        />
      ) : (
        <SearchIcon className={styles['search__icon']} />
      )}
    </div>
  )
}

export default ProductSearch
