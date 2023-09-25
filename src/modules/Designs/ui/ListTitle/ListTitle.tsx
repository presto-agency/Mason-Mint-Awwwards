import { FC, useMemo } from 'react'
import classNames from 'classnames'
import { BlueDot } from '@/ui/BlueDot'

import styles from './ListTitle.module.scss'
import { ProductsFilter } from '../../api/products'
import { CategoryProps } from '@/utils/types'
import dynamic from 'next/dynamic'
import { AnimatePresence, Transition, Variants, motion } from 'framer-motion'

type ListTitleProps = {
  className?: string
  scrollDirection: 'up' | 'down'
  currentCategoryInView?: string
  filters: ProductsFilter
  categories: CategoryProps[]
  count: number
}

const transition: Transition = { duration: 1, ease: 'anticipate' }

const ListTitle: FC<ListTitleProps> = ({
  className,
  filters,
  categories,
  scrollDirection,
  currentCategoryInView,
  count,
}) => {
  const selectedCategory = useMemo(() => {
    return (
      categories.find((item) => item.id === filters.category) || categories[0]
    )
  }, [filters.category, categories])

  const animationVariants: Variants = useMemo(() => {
    return {
      initial: {
        y: scrollDirection === 'down' ? -300 : 300,
      },
      animate: {
        y: 0,
      },
      exit: {
        y: scrollDirection === 'down' ? 300 : -300,
      },
    }
  }, [scrollDirection])

  const categoryInView = useMemo(() => {
    return (
      categories.find((item) => item.name === currentCategoryInView) ||
      categories[0]
    )
  }, [currentCategoryInView])

  return (
    <div className={classNames(styles['ListTitle'], className)}>
      {filters.search && (
        <>
          <h3>
            Results
            <BlueDot />
          </h3>
          <h6>
            {count} results found for <span>&quot;{filters.search}&quot;</span>
          </h6>
        </>
      )}
      {!filters.search && !filters.category && (
        <>
          <AnimatePresence mode="popLayout">
            <motion.h3
              initial="initial"
              animate="animate"
              exit="exit"
              variants={animationVariants}
              transition={transition}
              key={categoryInView.name}
            >
              {categoryInView.name}
              <BlueDot />
            </motion.h3>
          </AnimatePresence>

          <AnimatePresence mode="popLayout">
            <motion.h6
              initial="initial"
              animate="animate"
              exit="exit"
              variants={animationVariants}
              transition={transition}
              key={categoryInView.name}
            >
              {categoryInView.products?.length} results
            </motion.h6>
          </AnimatePresence>
        </>
      )}

      {!filters.search && filters.category && (
        <>
          <h3>
            {selectedCategory.name || ''}
            <BlueDot />
          </h3>
          <h6>{selectedCategory.products?.length} results</h6>
        </>
      )}
    </div>
  )
}

export default ListTitle
