/* eslint-disable @typescript-eslint/no-empty-function */
import { Dispatch, SetStateAction, createContext } from 'react'

type ProducsSectionContextType = {
  activeSection: string | undefined
  setActiveSection: Dispatch<SetStateAction<string | undefined>>
  clearSearch: () => void
}

export const ProducsSectionContext = createContext<ProducsSectionContextType>({
  activeSection: undefined,
  setActiveSection: () => {},
  clearSearch: () => {},
})
