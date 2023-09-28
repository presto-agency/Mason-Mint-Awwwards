import React, { FC, useEffect, useMemo, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from 'framer-motion'
import { useInfiniteQuery } from 'react-query'
import classNames from 'classnames'

import HeroInner from '@/ui/HeroInner/HeroInner'
import ProductSearch from './ProductSearch/ProductSearch'
import ProductFilters from './ProductFilters/ProductFilters'
import ProductList from './ProductList/ProductList'
import ListTitle from './ListTitle/ListTitle'

import { ProductsFilter, getProducts } from '../api/products'
import { CategoryProps } from '@/utils/types'

import styles from './DesignsContent.module.scss'
import { useLenis } from '@studio-freight/react-lenis'
import { ProducsSectionContext } from '../lib/ProductListContext'
import { useWindowSize } from 'usehooks-ts'
import ArrowSelect from '@/ui/Icons/ArrowSelect'
import { Portal } from '@/ui/Portal/Portal'

const BecomeDistributorSection = dynamic(
  () => import('@/components/BecomeDistributorSection/BecomeDistributorSection')
)

type DesignsContentProps = {
  categories: CategoryProps[]
}

const DesignsContent: FC<DesignsContentProps> = ({ categories }) => {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [filters, setFilters] = useState<ProductsFilter>({})
  const [currentCategoryInView, setCurrentCategoryInView] = useState<string>()

  const [showMobileFilter, setShowMobileFilter] = useState(false)
  const [showScrollToTopButton, setShowScrollToTopButton] = useState(false)

  const { width } = useWindowSize()

  const { data, isFetching, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ['getProducts', filters],
    ({ pageParam, queryKey }) => {
      return getProducts(pageParam, queryKey[1] as ProductsFilter)
    },
    {
      getNextPageParam: (lastPage) => {
        return lastPage.data.page < lastPage.data.pages
          ? lastPage.data.page + 1
          : undefined
      },
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  )

  const [direction, setDirection] = useState<'up' | 'down'>('down')

  const pageRef = useRef<HTMLElement | null>(null)
  const productSectionRef = useRef<HTMLElement | null>(null)

  const scroll = useScroll({ target: pageRef })

  useMotionValueEvent(scroll.scrollY, 'change', (l) => {
    if (l > 1100) {
      setShowScrollToTopButton(true)
    }

    if (l <= 1100) {
      setShowScrollToTopButton(false)
    }

    if (l > scroll.scrollY.getPrevious()) {
      setDirection('down')
    } else {
      setDirection('up')
    }
  })

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [])

  useEffect(() => {
    if (width > 767) {
      setShowMobileFilter(false)
    }
  }, [width])

  useEffect(() => {
    if (!filters.category) {
      setCurrentCategoryInView(undefined)
    }
  }, [filters.category])

  const lenis = useLenis()

  const mods = {
    [styles['headerShown']]: direction === 'up',
  }

  const toggleMobileFilters = () => {
    if (width >= 767) {
      return false
    }

    setShowMobileFilter((prev) => !prev)
  }

  const loadMoreButtonRef = useRef<HTMLDivElement | null>(null)

  const scrollTop = () => {
    return new Promise<void>((resolve) => {
      if (lenis) {
        lenis.stop()

        const targetOffsetTop = productSectionRef.current?.offsetTop || 0
        window.scrollTo({
          top: targetOffsetTop,
          behavior: 'smooth',
        })

        const checkScrollEnd = () => {
          const nearEnd = Math.abs(window.scrollY - targetOffsetTop) < 5
          if (nearEnd) {
            resolve()
            lenis.start()
          } else {
            requestAnimationFrame(checkScrollEnd)
          }
        }

        requestAnimationFrame(checkScrollEnd)
      } else {
        resolve()
      }
    })
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage()
        }
      },
      { threshold: 0 }
    )

    if (loadMoreButtonRef.current) {
      observer.observe(loadMoreButtonRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [hasNextPage, fetchNextPage])

  useEffect(() => {
    setCurrentCategoryInView(currentCategoryInView)
  }, [currentCategoryInView])

  const contextValues = useMemo(() => {
    return {
      activeSection: currentCategoryInView,
      setActiveSection: setCurrentCategoryInView,
      clearSearch: () => setSearchQuery(''),
    }
  }, [currentCategoryInView, setCurrentCategoryInView])

  return (
    <main ref={pageRef} className={styles['DesignsContent']}>
      <HeroInner
        title="Dreams in silver, brought alive"
        subtitle="browse by categories"
        description="We are thrilled to provide both investors and collectors with the best designs in the silver bullion industry."
        theme="gray"
        withBlueDot
        columns={10}
      />
      <ProducsSectionContext.Provider value={contextValues}>
        <section className={styles['productsSection']} ref={productSectionRef}>
          <div className={classNames(styles['left'], mods)}>
            <ProductSearch
              className={styles['search']}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              filters={filters}
              setFilters={setFilters}
              scrollTop={scrollTop}
            />
            <ProductFilters
              className={styles['filters']}
              categories={categories}
              filters={filters}
              setFilters={setFilters}
              scrollTop={scrollTop}
            />
          </div>
          <div className={styles['right']}>
            <div
              className={classNames(styles['stickyHeader'], mods)}
              onClick={toggleMobileFilters}
            >
              <ListTitle
                className={styles['title']}
                filters={filters}
                scrollDirection={direction}
                currentCategoryInView={currentCategoryInView}
                categories={categories}
                menuOpened={showMobileFilter}
                count={data?.pages[0].data.total || 0}
              />
              {showMobileFilter && (
                <ProductFilters
                  className={styles['filtersMobile']}
                  categories={categories}
                  filters={filters}
                  setFilters={setFilters}
                  scrollTop={scrollTop}
                />
              )}
            </div>
            {showMobileFilter && <div className={styles['overlay']} />}
            <ProductList
              className={styles['products']}
              filters={filters}
              loading={isFetching}
              products={data}
            />
            <div
              className={styles['loadingTrigger']}
              ref={loadMoreButtonRef}
            ></div>
          </div>
        </section>
      </ProducsSectionContext.Provider>

      <AnimatePresence mode="wait">
        {width < 767 && showScrollToTopButton && (
          <Portal>
            <motion.button
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: 100 }}
              transition={{ duration: 0.4, ease: 'anticipate' }}
              className={styles['buttonScrollTop']}
              onClick={() => scrollTop()}
            >
              <ArrowSelect className={styles['arrowIcon']} />
            </motion.button>
          </Portal>
        )}
      </AnimatePresence>

      <BecomeDistributorSection />
    </main>
  )
}

export default DesignsContent
