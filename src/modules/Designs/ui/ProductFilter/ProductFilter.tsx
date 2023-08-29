import { FC, Fragment, useEffect, useState } from 'react'
import classNames from 'classnames'
import CheckIcon from '@/ui/Icons/Check'
import Dropdown from '@/ui/Dropdown/Dropdown'
import CloseIcon from '@/ui/Icons/Close'
import { CategoryProps } from '@/utils/types'

import styles from './ProductFilter.module.scss'

type ProductFilterProps = {
  className?: string
  categories: CategoryProps[]
  onChange: (categories: CategoryProps[]) => void
}

const ProductFilter: FC<ProductFilterProps> = ({
  className,
  categories,
  onChange,
}) => {
  const [selectedCategories, setSelectedCategories] = useState<CategoryProps[]>(
    []
  )
  const [enableChange, setEnableChange] = useState<boolean>(false)

  const handleChange = (e: boolean, category: CategoryProps) => {
    const updatedCategories = e
      ? [...selectedCategories, category]
      : selectedCategories.filter((c) => c.id !== category.id)

    setSelectedCategories(updatedCategories)
    setEnableChange(true)
  }

  const handleReset = () => {
    setSelectedCategories([])
  }

  useEffect(() => {
    enableChange && selectedCategories.length
      ? onChange(selectedCategories)
      : onChange(categories)
  }, [enableChange, onChange, selectedCategories, categories])

  return (
    <Fragment>
      <Dropdown
        placeholder="Sort by colection"
        className={styles['filter__dropdown']}
      >
        <div className={classNames(styles['filter'], className)}>
          <div className={styles['filter__header']}>
            <div className={styles['filter__header_item']}>
              <p
                className={styles['filter__header_label']}
                style={{ opacity: !!selectedCategories.length ? 1 : 0 }}
              >
                {selectedCategories.length} Selected
              </p>
            </div>
            <div className={styles['filter__header_item']}>
              <button
                className={styles['filter__button']}
                onClick={handleReset}
                disabled={!selectedCategories.length}
              >
                Reset
              </button>
            </div>
          </div>
          <div className={styles['filter__options']}>
            {categories.map((category, index) => {
              return (
                <label className={styles['filter__option']} key={index}>
                  <div className={styles['filter__checkbox']}>
                    <input
                      type="checkbox"
                      className={styles['filter__checkbox_input']}
                      checked={selectedCategories.includes(category) || false}
                      onChange={(e) => handleChange(e.target.checked, category)}
                    />
                    <div className={styles['filter__checkbox_icon']}>
                      <CheckIcon className={styles['filter__checkbox_svg']} />
                    </div>
                  </div>
                  <p className={styles['filter__option_title']}>
                    {category.name}{' '}
                    {category?.products ? (
                      <span className={styles['filter__option_label']}>
                        ( {category.products.length} )
                      </span>
                    ) : null}
                  </p>
                </label>
              )
            })}
          </div>
        </div>
      </Dropdown>
      {selectedCategories.length > 0 && (
        <>
          <div className={styles['filter__tagsBox']}>
            <div className={styles['filter__tags']}>
              {selectedCategories.map((category, index) => {
                return (
                  <div
                    className={styles['filter__tags_item']}
                    key={index}
                    onClick={() => handleChange(false, category)}
                  >
                    <CloseIcon className={styles['filter__tags_icon']} />
                    {category.name}
                  </div>
                )
              })}
              <button
                className={styles['filter__button']}
                onClick={handleReset}
                disabled={!selectedCategories.length}
              >
                Reset
              </button>
            </div>
            <button
              className={styles['filter__button']}
              onClick={handleReset}
              disabled={!selectedCategories.length}
            >
              Reset
            </button>
          </div>
          <div className={styles['filter__tags_border']} />
        </>
      )}
    </Fragment>
  )
}

export default ProductFilter
