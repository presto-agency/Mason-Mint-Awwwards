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
  const animationVariants: Variants = useMemo(() => {
    return {
      initial: {
        y: scrollDirection === 'down' ? -150 : 150,
      },
      animate: {
        y: 0,
      },
      exit: {
        y: scrollDirection === 'down' ? 150 : -150,
      },
    }
  }, [scrollDirection])

  const displayContent = useMemo(() => {
    if (filters.search) {
      return {
        title: 'Results',
        result: `${count} results found for <span>&quot;${filters.search}&quot;`,
      }
    }

    const categoryToFind = !filters.category
      ? currentCategoryInView
      : filters.category

    const selectedCategory =
      categories.find((item) => item.id === categoryToFind) || categories[0]

    if (!filters.search && filters.category) {
      return {
        title: selectedCategory.name,
        result: `${selectedCategory.products?.length} results`,
      }
    }

    if (!filters.search && !filters.category) {
      return {
        title: selectedCategory.name,
        result: `${selectedCategory.products?.length} results`,
      }
    }

    return { title: categories[0].name, result: categories[0].products?.length }
  }, [
    filters.search,
    filters.category,
    count,
    currentCategoryInView,
    categories,
  ])

  return (
    <div className={classNames(styles['ListTitle'], className)}>
      <AnimatePresence mode="popLayout">
        <motion.h3
          initial="initial"
          animate="animate"
          exit="exit"
          variants={animationVariants}
          transition={transition}
          key={displayContent.title}
        >
          {displayContent.title}
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
          key={displayContent.title}
          dangerouslySetInnerHTML={{ __html: displayContent.result || '' }}
        ></motion.h6>
      </AnimatePresence>
    </div>
  )
}

export default ListTitle
