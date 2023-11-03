import { createContext, ReactNode, useReducer, Dispatch, Reducer } from 'react'
import { ProductProps } from '@/utils/types'

export interface IInitialStateProps {
  modal: {
    isOpenModal: boolean
  }
  products: ProductProps[]
  isFirstLoading: boolean
  isPreloadFinished: boolean
  isBecomeDistributorVisible: boolean
}

export interface IActionProps {
  type: string
  payload?: object | boolean
}

const initialState: IInitialStateProps = {
  modal: {
    isOpenModal: false,
  },
  products: [],
  isFirstLoading: true,
  isPreloadFinished: false,
  isBecomeDistributorVisible: false,
}

export const Store = createContext<{
  state: IInitialStateProps
  dispatch: Dispatch<IActionProps>
} | null>(null)

const reducer = (state: IInitialStateProps, action: IActionProps) => {
  switch (action.type) {
    case 'OPEN_MODAL': {
      return {
        ...state,
        modal: {
          ...state.modal,
          isOpenModal: true,
        },
      }
    }
    case 'CLOSE_MODAL': {
      return {
        ...state,
        modal: {
          ...state.modal,
          isOpenModal: false,
        },
      }
    }
    // Products
    case 'ADD_PRODUCTS': {
      return {
        ...state,
        products: action.payload as ProductProps[],
      }
    }
    case 'RESET_PRODUCTS': {
      console.log('store, reset products')
      return {
        ...state,
        products: [],
      }
    }
    case 'TOGGLE_FIRST_LOADING': {
      return {
        ...state,
        isFirstLoading: false,
      }
    }
    case 'IS_PRELOAD_FINISHED': {
      return {
        ...state,
        isPreloadFinished: true,
      }
    }
    //Visible section
    case 'IS_BECOME_DISTRIBUTOR_VISIBLE': {
      return {
        ...state,
        isBecomeDistributorVisible: action.payload as boolean,
      }
    }
    default:
      return state
  }
}

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer<
    Reducer<IInitialStateProps, IActionProps>
  >(reducer, initialState)
  return <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
}
