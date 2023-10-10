/* eslint-disable @typescript-eslint/no-empty-function */
import { Dispatch, SetStateAction, createContext } from 'react'
import { ProductsFilter } from '../api/products'

type ProducsSectionContextType = {
  activeSection: string | undefined

  setActiveSection: Dispatch<SetStateAction<string | undefined>>
  filters: ProductsFilter
  setFilters: Dispatch<SetStateAction<ProductsFilter>>
  scrollTop?: () => Promise<void>
}

export const ProducsSectionContext = createContext<ProducsSectionContextType>({
  activeSection: undefined,
  setActiveSection: () => {},
  filters: {},
  setFilters: () => {},
})
