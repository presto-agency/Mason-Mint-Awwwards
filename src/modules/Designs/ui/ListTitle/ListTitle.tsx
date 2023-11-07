import { FC, useContext, useMemo } from 'react'
import classNames from 'classnames'
import { BlueDot } from '@/ui/BlueDot'

import styles from './ListTitle.module.scss'
import { AnimatePresence, motion, Transition, Variants } from 'framer-motion'
import { useWindowSize } from 'usehooks-ts'
import { CategoryProps, ProductProps } from '@/utils/types'
import { ProducsSectionContext } from '../../lib/ProductListContext'
import ArrowSelect from '@/ui/Icons/ArrowSelect'
import { breakpointMob } from '@/utils/variables'

type ListTitleProps = {
  className?: string
  categories: CategoryProps[]
  products: ProductProps[] | undefined
  fetching: boolean
  menuOpened?: boolean
  currentCategoryIndex: number
}

const resultsVariants: Variants = {
  initial: { y: '-100%' },
  animate: { y: '0%' },
}

const categoryTitleVariants: Variants = {
  initial: { y: '100%' },
  animate: { y: '0%' },
}

const ListTitle: FC<ListTitleProps> = ({
  className,
  currentCategoryIndex,
  fetching,
  products,
  menuOpened = false,
  categories,
}) => {
  const { filters } = useContext(ProducsSectionContext)
  const { width } = useWindowSize()

  const mods = {
    [styles['opened']]: menuOpened,
  }

  const transition: Transition = useMemo(() => {
    return { duration: width > breakpointMob ? 1 : 0.4, ease: 'easeInOut' }
  }, [width])

  return (
    <div className={classNames(styles['ListTitle'], className)}>
      <AnimatePresence mode="popLayout">
        {filters.search && (
          <motion.div
            key={'result'}
            className={styles['ListTitle__inner']}
            initial="initial"
            animate="animate"
            exit="initial"
            variants={resultsVariants}
            transition={transition}
          >
            <h3>
              Results
              <BlueDot />
            </h3>
            <h6
              dangerouslySetInnerHTML={{
                __html:
                  width < breakpointMob
                    ? `${!fetching ? products?.length : '...'}`
                    : `${
                        !fetching ? products?.length : '...'
                      } results found for <span>&quot;${
                        filters.search
                      }&quot;</span>`,
              }}
            ></h6>
          </motion.div>
        )}

        {!filters.search && (
          <motion.div
            variants={categoryTitleVariants}
            initial="initial"
            animate="animate"
            exit="initial"
            transition={transition}
          >
            {categories.map((category) => {
              const initial = { y: '0%' }
              const animate = { y: `-${currentCategoryIndex * 100}%` }
              return (
                <motion.div
                  key={category.id}
                  className={styles['ListTitle__inner']}
                  initial={initial}
                  animate={animate}
                  transition={transition}
                >
                  <h3>
                    {category.name}
                    <BlueDot />
                  </h3>
                  <h6>
                    {width < breakpointMob
                      ? `${category.products?.length}`
                      : `${category.products?.length} results`}
                  </h6>
                </motion.div>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
      {width < breakpointMob && (
        <ArrowSelect className={classNames(styles['dropdownIcon'], mods)} />
      )}
    </div>
  )
}

export default ListTitle
