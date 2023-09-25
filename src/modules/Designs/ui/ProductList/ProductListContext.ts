import { Dispatch, SetStateAction, createContext } from 'react'

type ProductListContextType = {
  activeSection: string | null
  setActiveSection: Dispatch<SetStateAction<string | null>>
}

export const ProductListContext = createContext<ProductListContextType>({
  activeSection: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setActiveSection: () => {},
})
