import React, { FC, useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { useMotionValueEvent, useScroll } from 'framer-motion'
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

const BecomeDistributorSection = dynamic(
  () => import('@/components/BecomeDistributorSection/BecomeDistributorSection')
)

type DesignsContentProps = {
  categories: CategoryProps[]
}

const DesignsContent: FC<DesignsContentProps> = ({ categories }) => {
  const [filters, setFilters] = useState<ProductsFilter>({})
  const [currentCategoryInView, setCurrentCategoryInView] = useState<string>()

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
    }
  )

  const [direction, setDirection] = useState<'up' | 'down'>('down')

  const pageRef = useRef<HTMLElement | null>(null)
  const productSectionRef = useRef<HTMLElement | null>(null)

  const scroll = useScroll({ target: pageRef })

  useMotionValueEvent(scroll.scrollY, 'change', (l) => {
    if (l > scroll.scrollY.getPrevious()) {
      setDirection('down')
    } else {
      setDirection('up')
    }
  })

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [])

  const lenis = useLenis()

  const mods = {
    [styles['headerShown']]: direction === 'up',
  }

  const loadMoreButtonRef = useRef<HTMLDivElement | null>(null)

  const scrollTop = () => {
    if (lenis) {
      lenis.stop()
      window.scrollTo({
        top: productSectionRef.current?.offsetTop,
        behavior: 'smooth',
      })
      lenis.start()
    }
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
      <section className={styles['productsSection']} ref={productSectionRef}>
        <div className={classNames(styles['left'], mods)}>
          <ProductSearch
            className={styles['search']}
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
          <div className={classNames(styles['stickyHeader'], mods)}>
            <ListTitle
              className={styles['title']}
              filters={filters}
              scrollDirection={direction}
              currentCategoryInView={currentCategoryInView}
              categories={categories}
              count={data?.pages[0].data.total || 0}
            />
          </div>
          <ProductList
            className={styles['products']}
            filters={filters}
            loading={isFetching}
            setCurrentCategoryInView={setCurrentCategoryInView}
            products={data}
          />
          <div
            className={styles['loadingTrigger']}
            ref={loadMoreButtonRef}
          ></div>
        </div>
      </section>
      <BecomeDistributorSection />
    </main>
  )
}

export default DesignsContent
